'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Profile.init({
    fullName: {
      allowNull: false,
      type:DataTypes.STRING,
      validate: {
        notEmpty: { msg: "Fullname is required" },
        notNull: { msg: "Fullname is required" }
      }
    },
    birthdate: {
      allowNull: false,
      type:DataTypes.DATE,
      validate: {
        isDate: { msg: "Invalid date format" },  
        notEmpty: { msg: "Birthdate is required" },
        notNull: { msg: "Birthdate is required" }
      }
    },
    gender: {
      allowNull: false,
      type:DataTypes.STRING,
      validate: {
        notEmpty: { msg: "Gender is required" },
        notNull: { msg: "Gender is required" }
      }
    },
    address: {
      allowNull: false,
      type:DataTypes.STRING,
      validate: {
        notEmpty: { msg: "Address is required" },
        notNull: { msg: "Address is required" }
      }
    },
    photoProfile: DataTypes.STRING,
    phoneNumber: {
      allowNull: false,
      type:DataTypes.STRING,
      validate: {
        notEmpty: { msg: "Phone Number is required" },
        notNull: { msg: "Phone Number is required" }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};