import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import { empty } from 'rxjs/Observer';


@Component({
  selector: 'page-popup',
  templateUrl: 'popup.html'
})
export class Popup {
  public id: String;
  public temperatureChartData: Array<any> = [{data: [], label: 'Température'}]
  public temperatureChartLabels: Array<any> = []
  public brightnessChartData: Array<any> = []
  public brightnessChartLabels: Array<any> = []
  public soundChartData: Array<any> = []
  public soundChartLabels: Array<any> = []
  public airQualityChartData: Array<any> = []
  public airQualityChartLabels: Array<any> = []
  public temperatureLoaded = false
  public brightnessLoaded = false
  public soundLoded = false
  public airQualityLoaded = false
  constructor(public viewCtrl: ViewController, public navParams:NavParams) {
    let properties = this.navParams.get("properties");
    this.id = properties.id;
    var that = this
    this.updateCharts(this.id, 10)
  }

  updateCharts(NodeId, duration){
    var that = this
    firebase.database().ref('/temperature/' + NodeId).limitToLast(2).once('value').then(function(snapshot) {
      let results = snapshot.val()
      console.log(results)
      if (results != null && results.length != 0){
        that.temperatureChartData =  [{data: Object.keys(results).map(item => results[item].value), label: "Température"}]
        that.temperatureChartLabels = Object.keys(results).map(item => results[item].timestamp)
        that.temperatureLoaded = true
      }
    });
    firebase.database().ref('/sound_level/' + NodeId).limitToLast(2).once('value').then(function(snapshot) {
      let results = snapshot.val()
      if (results != null && results.length != 0){
        that.soundChartData =  [{data: Object.keys(results).map(item => results[item].value), label: "Son"}]
        that.soundChartLabels = Object.keys(results).map(item => results[item].timestamp)
        that.soundLoded = true
      }
    });
    firebase.database().ref('/air_quality/' + NodeId).limitToLast(2).once('value').then(function(snapshot) {
      let results = snapshot.val()
      if (results != null && results.length != 0){
        that.airQualityChartData =  [{data: Object.keys(results).map(item => results[item].value), label: "Qualité de l'air"}]
        that.airQualityChartLabels = Object.keys(results).map(item => results[item].timestamp)
        that.airQualityLoaded = true
      }
    });
    firebase.database().ref('/brightness/' + NodeId).limitToLast(2).once('value').then(function(snapshot) {
      let results = snapshot.val()
      if (results != null && results.length != 0){
        that.brightnessChartData =  [{data: Object.keys(results).map(item => results[item].value), label: "Luminosité"}]
        that.brightnessChartLabels = Object.keys(results).map(item => results[item].timestamp)
        that.brightnessLoaded = true
      }
    });

  }
  close() {
    this.viewCtrl.dismiss();
  }
  public lineChartOptions:any = {
    legend: {
      labels: {
          // This more specific font property overrides the global property
          fontColor: 'white'
      }
    },
    scales: {
      yAxes: [{
          ticks: {
              fontColor: 'white'
          },
      }],
    xAxes: [{
          ticks: {
              fontColor: 'white'
          },
      }]
  } ,
    fill:false,
    responsive: true
  };
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'red'
    }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'bar';
  
}