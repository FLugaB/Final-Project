const {Product, DetailProduct, sequelize} = require("../models")
const { Op } = require("sequelize");

module.exports = class Controller {

  static showProduct = async(req,res, next) => {
    try {
      const result = await Product.findAll({
        include: [
          {
              model: DetailProduct,
              attributes: {
                  exclude: ['createdAt', `updatedAt`]
              }
          }, 
        ]
      })
      if (result.length<1) {
        throw {name: "Product_not_found"}
      }
      res.status(200).json(result)
    } catch (err) {
      next(err)
    } 
  }

  static showProductById = async(req,res,next) => {
    try {
      const {id} = req.params
      const result = await Product.findByPk(id, {
        include: [
          {
              model: DetailProduct,
              attributes: {
                  exclude: ['createdAt', `updatedAt`]
              }
          }, 
        ]
      }) 
      if (!result) {
        throw {name: "Product_not_found"}
      } 
      res.status(200).json(result)
    } catch (err) {
      console.log(err);
      next(err)
    }
  }

  static addProduct =  async(req, res, next) => {

    const transaction = await sequelize.transaction()
      const { title, type, 
        name, price, stock, category, imageUrl, description 
      } = req.body

      const inputProduct = { title, type }
      try {
      if (!type) {
        throw { name: "TYPE_IS_NULL"}
      } 
      const productIsExist = await Product.findOne({
        where: {
          type: inputProduct.type
        }
      })
      
      if (productIsExist) {
        throw { name: "CANNOT_ADD_PRODUCT"}
      }
      
      const addProduct = await Product.create(inputProduct, 
        { transaction })
        
        if(!addProduct) throw { name: 'FAILED_ADD_PRODUCT'}
        
      const inputDetail = { ProductId: addProduct.id, name, price, stock, category, imageUrl, description }
      const addDetail = await DetailProduct.create(inputDetail, 
        { transaction })
      
      if(!addDetail) throw { name: 'FAILED_ADD_DETAIL'}
        
      await transaction.commit();
      res.status(201).json({
        id: addProduct.id,
        title: addProduct.title,
        type: addProduct.type,
        DetailProducts: [
          {
            id: addDetail.id,
            ProductId: addProduct.id,
            name: addDetail.name,
            price: addDetail.price,
            stock: addDetail.stock,
            category: addDetail.category,
            imageUrl: addDetail.imageUrl,
            description: addDetail.description,
          }
        ]
      })

    } catch (err) {
      next (err)
      await transaction.rollback()
    }
  }

  static updateProduct = async(req,res,next) => {
    const t = await sequelize.transaction()
    try {
      const {id} = req.params
      const {title, type} = req.body
      const input = {title, type}
      const getProductId = await Product.findOne({where: {id}})
      if(!getProductId) {
        throw {name: "Product_not_found"}
      } else if (getProductId.id !== 3) { 
        throw {name: "CANNOT_UPDATE_PRODUCT"}
      } else {
        
        if (!title ||title.length === 0) {
          throw {name: "BAD_REQUEST", message: "Title is required"}
        } 
        if (!type ||type.length === 0) {
          throw {name: "BAD_REQUEST", message: "Type is required"}
        } 
        
        const result = await Product.update(input, {where: {id}, returning:true, transaction:t})
        await t.commit()
        res.status(200).json(result)     
      }

    } catch (err) {
      next(err)
      await t.rollback()
    }
  }

  static deleteProduct = async (req,res,next) => {
    const t = await sequelize.transaction()
    try {
      const {id} = req.params
      const find = await Product.findByPk(id)
      if (!find) {
          throw {name: "Product_not_found"}
      } else if (+find.id === 1 || +find.id === 2) {
          throw {name: "CANNOT_DELETE_PRODUCT"}
      } 
        await Product.destroy ({where : {id}, transaction:t})
        res.status(200).json({message: "Success Delete Product"})
        await t.commit()
      
    } catch (err) {
      next(err)
      await t.rollback()
    }
  }

  static addDetail =  async(req, res, next) => {
    const t = await sequelize.transaction()
    try {
      const {ProductId, name, price, stock, category, imageUrl, description} = req.body
      const input = {ProductId, name, price, stock, category, imageUrl, description}
      if(!ProductId) {

        throw {name: "PRODUCT_ID_IS_REQUIRED"}
      } 

      const getProductId = await DetailProduct.findOne({
        where : { ProductId }
      })
      
      if(!getProductId) {

        throw {name: "Product_not_found"}
      } 
      // if (getProductId.ProductId < 3) {

      //   throw { name: "CANNOT_ADD_DETAIL"}
      // } else 
      if (getProductId.ProductId === 3) {

        const result = await DetailProduct.create(input, {transaction:t})
        await t.commit()
        res.status(201).json(result)
      } else {
        // PROBLEM TEST
        throw { name: "CANNOT_ADD_DETAIL"}
      }
      
      

    } catch (err) {
      next (err)
    }
  }

  static updateDetail = async(req,res,next) => {
    const t = await sequelize.transaction()
    try {
      
      const {id} = req.params
      const {name, price, stock, category, imageUrl, description} = req.body
      if (!name) {
        throw { name: "NAME_IS_REQUIRED"}
      } if (price < 9999) {
        throw { name: "MIN_PRICE_IS_REQUIRED"}
      } if (!price) {
        throw { name: "PRICE_IS_REQUIRED"}
      } if (stock < 1) {
        throw { name: "MIN_STOCK_IS_REQUIRED"}
      }  if (!stock) {
        throw { name: "STOCK_IS_REQUIRED"}
      } if (!category) {
        throw { name: "CATEGORY_IS_REQUIRED"}
      } if (!imageUrl) {
        throw { name: "IMAGE_IS_REQUIRED"}
      } if (!description) {
        throw { name: "DESCRIPTION_IS_REQUIRED"}
      }
    
      const getProductId = await DetailProduct.findOne({where: {id}})
      // PROBLEM TEST
      if(!getProductId) {
        throw {name: "Product_not_found"}
      } 
      // PROBLEM TEST
      if (getProductId.ProductId < 3) {
        const input = {price}
      
        const result = await DetailProduct.update(input, {where: {id}, returning:true, transaction:t})
        await t.commit()
        res.status(200).json(result)   
        
      } else {
        const input = {ProductId: getProductId.ProductId, name, price, stock, category,imageUrl, description}
      
        const result = await DetailProduct.update(input, {where: {id}, returning:true, transaction:t})
        await t.commit()
        res.status(200).json(result)  
      }
      
    
    } catch (err) {
      next(err)
      await t.rollback()
    }
  }

  static deleteDetail = async (req,res,next) => {
    const t = await sequelize.transaction()
    try {
      const {id} = req.params
      const find = await DetailProduct.findByPk(id)
      
      if (!find) {
        throw {name: "Product_not_found"}
      } 
      // PROBLEM TEST
      if (find.ProductId === 1 || find.ProductId === 2) {
        throw { name: "CANNOT_DELETE_PRODUCT" }
      } 
        await DetailProduct.destroy ({where : {id}, transaction:t})
        res.status(200).json({message: "Success Delete Product"})
        await t.commit()
      
        
    } catch (err) {
      next(err)
      await t.rollback()
    }
  }

}