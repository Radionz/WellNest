const Sequelize = require('sequelize')
const SensorDataModel = require('./models/sensorData')

const sequelize = new Sequelize('wellnest', 'root', 'TOCS2018', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  operatorsAliases: false
})

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const SensorData = SensorDataModel(sequelize, Sequelize)

/*sequelize.sync({ force: true })
  .then(() => {
    console.log(`Database & tables created!`)
  })
*/
module.exports = SensorData
