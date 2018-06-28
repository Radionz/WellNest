import { Local } from './../../providers/local.service';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import * as L from 'leaflet';
import 'leaflet-easybutton';
import 'rxjs/add/operator/take';
import {Platform} from 'ionic-angular';
import { PopoverController} from 'ionic-angular';
import {Popup} from '../popup/popup';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('map') mapContainer: ElementRef;
  map: any;
  geoJsonLayer: any;
  floorsButtonList: any = [];
  width: number;
  height:number;
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
  }

  openPopover(myEvent) {
    let popover = this.popoverCtrl.create(Popup, myEvent, { cssClass: 'custom-popover'});
    popover.present({
      ev: myEvent
    });
  }

  drawInMap(coordinates, center, zoomLevel){
    this.geoJsonLayer.clearLayers();
    this.geoJsonLayer.addData(coordinates);
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
              that.drawInMap(that.local.sitesArchitechtures[event][button.options['id']]['coordinates'],
              that.local.sitesArchitechtures[event][button.options['id']]['center'],
              that.local.sitesArchitechtures[event][button.options['id']]['zoomLevel']);
            },
            title: 'show me the middle',
            icon: '<span class="star">'+floors[i]+'</span>'
          }]
        });
        button['button'].style.backgroundColor = color;
        this.floorsButtonList.push(button);
        button.addTo(this.map);
      }
      this.drawInMap(coordinates, center, zoomLevel)
  }




} 