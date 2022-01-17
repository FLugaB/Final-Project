'use strict';
const { hashPass } = require(`../helpers/bycrpt`)

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Profile)
    }
  }
  User.init({
    email: {
      allowNull: false,
      type:DataTypes.STRING,
      unique: { msg: "Email must be unique" },
      validate: {
        notEmpty: { msg: "Email is required" },
        isEmail: { msg: "Invalid email format" },
        notNull: { msg: "Email is required" }
      }
    },
    password: {
      allowNull: false,
      type:DataTypes.STRING,
      validate: {
        notEmpty: { msg: "Password is required" },
        notNull: { msg: "Password is required" }
      }
    },
    role: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate(instance, options){
        instance.password = hashPass(instance.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};