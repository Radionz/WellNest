module.exports = function(sequelize, DataTypes) {
  return sequelize.define('sensorData', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nodeID: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    sensorName: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    sensorValue: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'sensorData',
    timestamps: false
  });
};
