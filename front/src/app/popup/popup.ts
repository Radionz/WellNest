import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import * as moment from 'moment';



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
  public soundLoaded = false
  public airQualityLoaded = false

  private limitToLoad = 20
  constructor(public viewCtrl: ViewController, public navParams:NavParams) {
    let properties = this.navParams.get("properties");
    this.id = properties.id;
    this.updateCharts(this.id, 10)
  }

  updateCharts(NodeId, duration){
    var that = this
    firebase.database().ref('/temperature/' + NodeId).limitToLast(this.limitToLoad).once('value').then(function(snapshot) {
      let results = snapshot.val()
      //console.log(results)
      if (results != null && results.length != 0){
        that.temperatureChartData =  [{data: Object.keys(results).map(item => results[item].value), label: "Température", fill: false, borderColor: "red"}]
        that.temperatureChartLabels = Object.keys(results).map(item => moment.unix(Number(results[item].timestamp)).format("hh:mm"))
        that.temperatureLoaded = true
      }
    });
    firebase.database().ref('/sound_level/' + NodeId).limitToLast(this.limitToLoad).once('value').then(function(snapshot) {
      let results = snapshot.val()
      if (results != null && results.length != 0){
        that.soundChartData =  [{data: Object.keys(results).map(item => results[item].value), label: "Son", fill: false, borderColor: "grey"}]
        that.soundChartLabels = Object.keys(results).map(item => moment.unix(Number(results[item].timestamp)).format("hh:mm"))
        that.soundLoaded = true
      }
    });
    firebase.database().ref('/air_quality/' + NodeId).limitToLast(this.limitToLoad).once('value').then(function(snapshot) {
      let results = snapshot.val()
      if (results != null && results.length != 0){
        that.airQualityChartData =  [{data: Object.keys(results).map(item => results[item].value), label: "Qualité de l'air", fill: false, borderColor: "green"}]
        that.airQualityChartLabels = Object.keys(results).map(item => moment.unix(Number(results[item].timestamp)).format("hh:mm"))
        that.airQualityLoaded = true
      }
    });
    firebase.database().ref('/brightness/' + NodeId).limitToLast(this.limitToLoad).once('value').then(function(snapshot) {
      let results = snapshot.val()
      if (results != null && results.length != 0){
        that.brightnessChartData =  [{data: Object.keys(results).map(item => results[item].value), label: "Luminosité", fill: false, borderColor: "yellow"}]
        that.brightnessChartLabels = Object.keys(results).map(item => moment.unix(Number(results[item].timestamp)).format("hh:mm"))
        that.brightnessLoaded = true
      }
    });



  }
  close() {
    this.viewCtrl.dismiss();
  }
  public temperatureChartOptions:any = {
    legend: {
      labels: {
          fontColor: 'white'
      }
    },
    scales: {
      yAxes: [{
          ticks: {
              fontColor: 'white',
              min: -10,
              max: 50
          },
      }],
      xAxes: [{
          ticks: {
              fontColor: 'white'
          },
      }]
    }
  };
  public brightnessChartOptions:any = {
    legend: {
      labels: {
          fontColor: 'white'
      }
    },
    scales: {
      yAxes: [{
          ticks: {
              fontColor: 'white',
              min: 0,
              max: 2000
          },
      }],
      xAxes: [{
          ticks: {
              fontColor: 'white'
          },
      }]
    }
  };

  public airQualityChartOptions:any = {
    legend: {
      labels: {
          fontColor: 'white'
      }
    },
    scales: {
      yAxes: [{
          ticks: {
              fontColor: 'white',
              min: 0,
              max: 500
          },
      }],
      xAxes: [{
          ticks: {
              fontColor: 'white'
          },
      }]
    }
  };

  public soundChartOptions:any = {
    legend: {
      labels: {
          fontColor: 'white'
      }
    },
    scales: {
      yAxes: [{
          ticks: {
              fontColor: 'white',
              min: 0,
              max: 500
          },
      }],
      xAxes: [{
          ticks: {
              fontColor: 'white'
          },
      }]
    }
  };
  public temperatureChartColors:Array<any> = [{ backgroundColor: 'red'}];
  public brightnessChartColors:Array<any> = [{ backgroundColor: 'yellow'}];
  public airQualityChartColors:Array<any> = [{ backgroundColor: 'green'}];
  public soundChartColors:Array<any> = [{ backgroundColor: 'grey'}];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';
  
}