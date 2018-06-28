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
    this.updateCharts(this.id, 10);
    this.updateScore(this.id);
  }

  updateCharts(NodeId, duration){
    var that = this
    firebase.database().ref('/temperature/' + NodeId).limitToLast(this.limitToLoad).once('value').then(function(snapshot) {
      let results = snapshot.val()
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
  updateScore(NodeId){
    var temperaturePromise = firebase.database().ref('/temperature/' + NodeId).limitToLast(this.limitToLoad).once('value');
    var soundLevelPromise = firebase.database().ref('/sound_level/' + NodeId).limitToLast(this.limitToLoad).once('value');
    var airQualityPromise = firebase.database().ref('/air_quality/' + NodeId).limitToLast(this.limitToLoad).once('value');
    var brightnessPromise = firebase.database().ref('/brightness/' + NodeId).limitToLast(this.limitToLoad).once('value');

    Promise.all([temperaturePromise, soundLevelPromise, airQualityPromise, brightnessPromise]).then(function(metrics) {

      if(metrics[0].val() != null){ //temperature
        let temperatureSum : number = 0;
        let temperatureAvg : number = 0;
        for(let temperatureKey in metrics[0].val()){
          temperatureSum += metrics[0].val()[temperatureKey].value;
        }
        temperatureAvg = temperatureSum / Object.keys(metrics[0].val()).length;
      }
      
      if(metrics[1].val() != null){ //soundLevel
        let soundLevelSum : number = 0;
        let soundLevelAvg : number = 0;
        for(let soundLevelKey in metrics[1].val()){
          soundLevelSum += metrics[1].val()[soundLevelKey].value;
        }
        soundLevelAvg = soundLevelSum / Object.keys(metrics[1].val()).length;
      }

      if(metrics[2].val() != null){ //airQuality
        let airQualitySum : number = 0;
        let airQualityAvg : number = 0;
        for(let airQualityKey in metrics[2].val()){
          airQualitySum += metrics[2].val()[airQualityKey].value;
        }
        airQualityAvg = airQualitySum / Object.keys(metrics[2].val()).length;
      }

      if(metrics[3].val() != null){ //brightness
        let brightnessSum : number = 0;
        let brightnessAvg : number = 0;
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

      score = score/count*100;
      console.log("Score is " + score.toFixed(1) + "/100" );

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