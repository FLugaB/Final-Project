const {Product, DetailProduct} = require("../models")

module.exports = class Controller {

  static addProduct =  async(req, res, next) =>{
    try {
      const {title, type} = req.body
      const input = {title, type}
      const result = await Product.create(input)
      res.status(201).json(result)
    } catch (err) {
      console.log(err);
      next (err)
    }
  }

  static showProduct = async(req,res, next) => {
    try {
      const result = await Product.findAll()
      if(result.length === 0) {
        res.status(200).json({msg: "There is no product"})
      }
      res.status(200).json(result)
    } catch (err) {
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
      if(!find) {
        throw {name: "Product_not_found"}
      }
      const result = await Product.update(input, {where: {id}, returning:true})
      res.status(200).json(result)      
    } catch (err) {
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

  static addDetail =  async(req, res, next) =>{
    try {
      console.log("masuk>>>>>>>", req.body);
      const {ProductId, name, price, stock, category, imageUrl, description} = req.body
      const input = {ProductId, name, price, stock, category, imageUrl, description}
      const result = await DetailProduct.create(input)
      res.status(201).json(result)
    } catch (err) {
      console.log(err);
      next (err)
    }
  }

  static showDetail = async(req,res, next) => {
    try {
      const result = await DetailProduct.findAll()
      if(result.length === 0) {
        res.status(200).json({msg: "There is no product"})
      }
      res.status(200).json(result)
    } catch (err) {
      console.log(err);
      next(err)
    } 
  }

  static showDetailById = async(req,res,next) =>{
    try {
      const {id} = req.params
      const result = await DetailProduct.findByPk(id) 
      if (!result) {
        throw {name: "Product_not_found"}
      } 
      res.status(200).json(result)
    } catch (err) {
      next(err)
    }
  }

  static updateDetail = async(req,res,next) => {
    try {
      const {id} = req.params
      const {ProductId, name, price, stock, category, imageUrl, description} = req.body
      const input = {ProductId, name, price, stock, category,imageUrl, description}
      const find = await DetailProduct.findByPk(id)
      if(!find) {
        throw {name: "Product_not_found"}
      }
      const result = await DetailProduct.update(input, {where: {id}, returning:true})
      res.status(200).json(result)      
    } catch (err) {
      console.log(err);
      next(err)
    }
  }

  static deleteDetail = async (req,res,next) =>{
    try {
      const {id} = req.params
      const find = await DetailProduct.findByPk(id)
      if (!find) {
        throw {name: "Product_not_found"}
      }
      const result = await DetailProduct.destroy ({where : {id}})
      res.status(200).json({message: "Success Delete Product"})
    } catch (err) {
      next(err)
    }
  }
}