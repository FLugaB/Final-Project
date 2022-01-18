const {Product} = require("../models")

module.exports = class Controller {

  static addProduct =  async(req, res, next) =>{
    try {
      const {title, type} = req.body
      const input = {title, type}
      console.log(input);
      const result = await Product.create(input)
      console.log(result);
      res.status(201).json(result)
    } catch (err) {
      console.log(err);
      next (err)
    }
  }

  static showProduct = async(req,res, next) => {
    try {
      const result = await Product.findAll()
      console.log(result,">>>>>>>>>>>");
      res.status(200).json(result)
    } catch (err) {
      console.log(err);
      next(err)
    } 
  }

  static showProductById = async(req,res,next) =>{
    try {
      const {id} = req.params
      const result = await Product.findByPk(id) 
      if (!result) {
        throw {name: "Product_not_found"}
      } 
      res.status(200).json(result)
    } catch (err) {
      next(err)
    }
  }

  static updateProduct = async(req,res,next) => {
    try {
      const {id} = req.params
      const {title, type} = req.body
      const input = {title, type}
      const find = await Product.findByPk(id)
      console.log(find,">>>>>>>>>>");
      if(!find) {
        throw {name: "Product_not_found"}
      }
      const result = await Product.update(input, {where: {id}, returning:true})
      res.status(200).json(result)      
    } catch (err) {
      console.log(err);
      next(err)
    }
  }

  static deleteProduct = async (req,res,next) =>{
    try {
      const {id} = req.params
      const find = await Product.findByPk(id)
      if (!find) {
        throw {name: "Product_not_found"}
      }
      const result = await Product.destroy ({where : {id}})
      res.status(200).json({message: "Success Delete Product"})
    } catch (err) {
      next(err)
    }
  }
}