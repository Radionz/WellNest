import { Local } from './../../providers/local.service';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import * as L from 'leaflet';
import 'leaflet-easybutton';
import 'leaflet.heat';
import 'rxjs/add/operator/take';
import {Platform} from 'ionic-angular';
import { PopoverController} from 'ionic-angular';
import {Popup} from '../popup/popup';
import * as firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('map') mapContainer: ElementRef;
  map: any;
  geoJsonLayer: any;
  heatMapLayer: any;
  floorsButtonList: any = [];
  width: number;
  height:number;
  private limitToLoad = 20
  constructor(public navCtrl: NavController, 
              public local: Local, 
              private database: AngularFireDatabase, 
              platform: Platform,
              public popoverCtrl: PopoverController) {
    platform.ready().then((readySource) => {
      this.width = platform.width();
      this.height = platform.height();
    });
  }

  ionViewDidEnter() {
    this.initMap();
  }

  initMap() {
    var that = this;
    function style (feature) {
      var fill = 'white';
      if (feature.properties.type === 'office') {
        
        fill = '#5cd65c';
      }
      if (feature.properties.type === 'corridor') {
        fill = '#ff6666';
      }
      return {
        fillColor: fill,
        weight: 1,
        color: '#666',
        fillOpacity: 1,
        zIndex: 10000
      };
    }

    function onEachFeature(feature, layer){
      if(feature.geometry.type === 'Point'){
        layer.on('click', function(e){
          that.openPopover(feature);
        });
        
      }
    }
    this.map = L.map("map", {
      zoomControl: false,
      attributionControl: false,
      maxZoom: 2,
      minZoom: 2,
      maxBoundsViscosity: 1
    }).setView([30.14512718337613, 10.1953125], 2);
    var southWest:[number, number] =  [-544.21875, -84.12497319391093];
    var northEast: [number, number] = [627.1875, 84.8024737243345];
    this.map.setMaxBounds(new L.LatLngBounds(southWest, northEast));
    this.geoJsonLayer = L.geoJSON(null,{style: style, onEachFeature: onEachFeature }).addTo(this.map);
    this.heatMapLayer = L.heatLayer([], {radius: 100, gradient: {0.33: 'red', 0.66: 'orange', 1.0: 'green'}, blur:30}).addTo(this.map);
  }

  openPopover(myEvent) {
    let popover = this.popoverCtrl.create(Popup, myEvent, { cssClass: 'custom-popover'});
    popover.present({
      ev: myEvent
    });
  }

  drawGeoJson(coordinates, center, zoomLevel){
    this.geoJsonLayer.clearLayers();
    this.geoJsonLayer.addData(coordinates);
  }

  drawHeatMap(coordinates){
    var latLngs = this.computeLatLngs(coordinates)
    this.heatMapLayer.setLatLngs(latLngs)
    this.heatMapLayer.redraw()
  }

  computeLatLngs(coordinates){
    let NodeIds:any = coordinates['features'].filter(item => item['geometry']['type'] == "Point")
                                     .map(item => [item['geometry']['coordinates'][1],
                                                   item['geometry']['coordinates'][0],
                                                   item['properties']['id']])
    var latLngs = []
    for(var i = 0; i < NodeIds.length; i++){
      var nodeScore = this.computeNodeScore(NodeIds[i][2])
      latLngs.push([NodeIds[i][0], NodeIds[i][1], nodeScore])
    }
    return latLngs
  }

  computeNodeScore(NodeId){
    var temperaturePromise = firebase.database().ref('/temperature/' + NodeId).limitToLast(this.limitToLoad).once('value');
    var soundLevelPromise = firebase.database().ref('/sound_level/' + NodeId).limitToLast(this.limitToLoad).once('value');
    var airQualityPromise = firebase.database().ref('/air_quality/' + NodeId).limitToLast(this.limitToLoad).once('value');
    var brightnessPromise = firebase.database().ref('/brightness/' + NodeId).limitToLast(this.limitToLoad).once('value');
    Promise.all([temperaturePromise, soundLevelPromise, airQualityPromise, brightnessPromise]).then(function(metrics) {
      let temperatureSum: number = null,
      temperatureAvg: number = null,
      soundLevelSum: number = null,
      soundLevelAvg: number = null,
      airQualitySum: number = null,
      airQualityAvg: number = null,
      brightnessSum: number = null,
      brightnessAvg: number = null
      if(metrics[0].val() != null){ //temperature
        temperatureSum = 0;
        temperatureAvg = 0;
        for(let temperatureKey in metrics[0].val()){
          temperatureSum += metrics[0].val()[temperatureKey].value;
        }
        temperatureAvg = temperatureSum / Object.keys(metrics[0].val()).length;
      }
      
      if(metrics[1].val() != null){ //soundLevel
        soundLevelSum = 0;
        soundLevelAvg = 0;
        for(let soundLevelKey in metrics[1].val()){
          soundLevelSum += metrics[1].val()[soundLevelKey].value;
        }
        soundLevelAvg = soundLevelSum / Object.keys(metrics[1].val()).length;
      }

      if(metrics[2].val() != null){ //airQuality
        airQualitySum = 0;
        airQualityAvg = 0;
        for(let airQualityKey in metrics[2].val()){
          airQualitySum += metrics[2].val()[airQualityKey].value;
        }
        airQualityAvg = airQualitySum / Object.keys(metrics[2].val()).length;
      }

      if(metrics[3].val() != null){ //brightness
        brightnessSum = 0;
        brightnessAvg = 0;
        for(let brightnessKey in metrics[3].val()){
          brightnessSum += metrics[3].val()[brightnessKey].value;
        }
        brightnessAvg = brightnessSum / Object.keys(metrics[3].val()).length;
      }

      let score : number = 0;
      let count : number = 0;
      
      if (temperatureAvg !== undefined) {
        score += checkAccuracy(temperatureAvg, 19, 22);
        count++;
      }
      if (soundLevelAvg !== undefined) {
        score += checkAccuracy(soundLevelAvg, 10, 15);
        count++;
      }
      if (airQualityAvg !== undefined) {
        score += checkAccuracy(airQualityAvg, 100, 120);
        count++;
      }
      if (brightnessAvg !== undefined) {
        score += checkAccuracy(brightnessAvg, 120, 180);
        count++;
      }
      score = score/count;
      console.log(score)
      return score

      function checkAccuracy(value: number, min: number, max: number): number{
        if (value < max && value > min){
          return 1;
        } else if (value > 2*max) {
          return 0;
        } else if (value < max) {
          return 1-((min-value)/min);
        } else {
          return 1-((value-max)/max);
        }
      }
      
    });
  }

  clearFloorsButtonList(){
    for(var i = 0; i < this.floorsButtonList.length; i++){
      this.floorsButtonList[i].remove();
    }
    this.floorsButtonList = [];
  }


  itemSelected(event: any){
      
      let defaultFloor = this.local.sitesArchitechtures[event]['defaultFloor'];
      let floors = this.local.sitesArchitechtures[event]['floors'];
      let center = this.local.sitesArchitechtures[event][defaultFloor]['center'];
      let coordinates = this.local.sitesArchitechtures[event][defaultFloor]['coordinates'];
      let zoomLevel = this.local.sitesArchitechtures[event][defaultFloor]['zoomLevel'];
      
      let that = this;
      
      this.clearFloorsButtonList();
      for(var i = 0; i < floors.length; i++){
        var color = "grey";
        if(floors[i] === defaultFloor){
          color = "white";
        }
        var button = L.easyButton({
          id: ''+floors[i],
          position: 'bottomright', 
          states:[{
            stateName: ''+i,
            onClick: function(button, map){
              for(var j = 0; j< that.floorsButtonList.length; j++){
                if(that.floorsButtonList[j].options.id != button.options['id'])
                  that.floorsButtonList[j].button.style.backgroundColor = "grey";
              }
              button['button'].style.backgroundColor = "white";
              that.drawGeoJson(that.local.sitesArchitechtures[event][button.options['id']]['coordinates'],
              that.local.sitesArchitechtures[event][button.options['id']]['center'],
              that.local.sitesArchitechtures[event][button.options['id']]['zoomLevel']);
              that.drawHeatMap(that.local.sitesArchitechtures[event][button.options['id']]['coordinates']);
            },
            title: 'show me the middle',
            icon: '<span class="star">'+floors[i]+'</span>'
          }]
        });
        button['button'].style.backgroundColor = color;
        this.floorsButtonList.push(button);
        button.addTo(this.map);
      }
      this.drawGeoJson(coordinates, center, zoomLevel)
      this.drawHeatMap(coordinates)
  }




} 