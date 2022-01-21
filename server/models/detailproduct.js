'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DetailProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DetailProduct.belongsTo(models.Product)
    }
  }
  DetailProduct.init({
    ProductId: {
      allowNull: false,
      type:DataTypes.INTEGER,
      validate: {
        notEmpty: { msg: "Product is required" },
        notNull: { msg: "Product is required" }
      }
    },
    name: {
      allowNull: false,
      type:DataTypes.STRING,
      validate: {
        notEmpty: { msg: "Name is required" },
        notNull: { msg: "Name is required" }
      }
    },
    price: {
      type:DataTypes.INTEGER,
      validate: {
        notEmpty: { msg: "price is required" },
        min: { args: 1, msg: "Price can't be 0"},
      },

    },
    stock:  {
      type:DataTypes.INTEGER,
      validate: {
        notEmpty: { msg: "stock is required" },
        min: { args: [0], msg: "Stock can't be lower then 0"},
      }
    },
    category: {
      allowNull: false,
      type:DataTypes.STRING,
      validate: {
        notEmpty: { msg: "Category is required" },
        notNull: { msg: "Category is required" }
      }
    },
    imageUrl: {
      allowNull: false,
      type:DataTypes.STRING,
      validate: {
        notEmpty: { msg: "Image is required" },
        notNull: { msg: "Image is required" }
      }
    },
    description: {
      allowNull: false,
      type:DataTypes.STRING,
      validate: {
        notEmpty: { msg: "Description is required" },
        notNull: { msg: "Description is required" }
      }
    },
  }, {
    sequelize,
    modelName: 'DetailProduct',
  });
  return DetailProduct;
};