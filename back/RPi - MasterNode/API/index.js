const express = require('express')
const bodyParser = require('body-parser')
const SensorData = require('./sequelize')
const firebase = require('firebase-admin');

const app = express()
app.use(bodyParser.json())

// get all sensorData
app.get('/api/sensorData', (req, res) => {
    SensorData.findAll({ limit: 100 }).then(users => res.json(users))
})

const port = 8080
app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`)
})