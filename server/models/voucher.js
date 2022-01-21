'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Voucher extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Voucher.init({
    voucherToken: DataTypes.STRING,
    status: DataTypes.STRING,
    DoctorId: DataTypes.INTEGER,
    ClientId: DataTypes.INTEGER,
    transactionId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Voucher',
  });
  return Voucher;
};