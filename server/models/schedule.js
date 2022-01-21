'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Schedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Schedule.belongsTo(models.User, {foreignKey: 'UserId'})
    }
  }
  Schedule.init({
    day: DataTypes.STRING,
    hour: DataTypes.STRING,
    price: DataTypes.INTEGER,
    hospital: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    ScheduleTagId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Schedule',
  });
  return Schedule;
};