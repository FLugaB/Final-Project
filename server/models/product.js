'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init({
    title: {
      allowNull: false,
      type:DataTypes.STRING,
      validate: {
        notEmpty: { msg: "Product is required" },
        notNull: { msg: "Product is required" }
      }
    },
    type:  {
      allowNull: false,
      type:DataTypes.STRING,
      validate: {
        notEmpty: { msg: "Type is required" },
        notNull: { msg: "Type is required" }
      }
    },
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};