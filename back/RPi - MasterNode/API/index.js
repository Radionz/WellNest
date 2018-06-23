const express = require('express');
const bodyParser = require('body-parser');
const SensorData = require('./sequelize');
const schedule = require('node-schedule');
const moment = require('moment');
const firebase = require('firebase-admin');

var config = {
    apiKey: "AIzaSyDnWtrvXWUPMCF-qBdam-jr8Q8XKEkH3Ds",
    authDomain: "wellnest-39396.firebaseapp.com",
    databaseURL: "https://wellnest-39396.firebaseio.com",
    projectId: "wellnest-39396",
    storageBucket: "wellnest-39396.appspot.com",
    messagingSenderId: "929248141108",
    credential: {
        getAccessToken: () => ({
            expires_in: 0,
            access_token: '',
        }),
    }
};
firebase.initializeApp(config);

var db = firebase.database();
var temperatureRoot = db.ref("/temperature");

const app = express()
app.use(bodyParser.json())

// get last 100 sensorData
app.get('/api/sensorData', (req, res) => {
    SensorData.findAll({ limit: 100 }).then(users => res.json(users))
})

var ex = [
    {
      "id": 1,
      "nodeID": 1,
      "sensorName": "LGT",
      "sensorValue": 195,
      "createdAt": "2018-05-13T18:41:48.000Z"
    },
    {
      "id": 2,
      "nodeID": 1,
      "sensorName": "TMP",
      "sensorValue": 22.5,
      "createdAt": "2018-05-13T18:41:48.000Z"
    },
    {
      "id": 3,
      "nodeID": 2,
      "sensorName": "LGT",
      "sensorValue": 21.1,
      "createdAt": "2018-05-13T18:41:51.000Z"
    },
    {
      "id": 4,
      "nodeID": 1,
      "sensorName": "TMP",
      "sensorValue": 24.2,
      "createdAt": "2018-05-13T18:41:53.000Z"
    },
    {
      "id": 5,
      "nodeID": 2,
      "sensorName": "TMP",
      "sensorValue": 21.3,
      "createdAt": "2018-05-13T18:41:55.000Z"
    }];

var job = schedule.scheduleJob('*/5 * * * * *', function(){
    console.log('Job executed at ' + moment().format('LLLL'));



    for(let sensorData of ex){     
        switch (sensorData.sensorName) {
            case 'TMP':
                temperatureRoot.child("/"+sensorData.nodeID).push({
                    "timestamp": new Date(sensorData.createdAt).getTime(),
                    "value" : sensorData.sensorValue
                });
                break;
        
            default:
                break;
        }
    }

});

const port = 8080
app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`)
})