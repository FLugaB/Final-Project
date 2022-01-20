const {Product, DetailProduct, sequelize} = require("../models")
module.exports = class Controller {

  static addProduct =  async(req, res, next) =>{
    const transaction = await sequelize.transaction()
      const { title, type, name, price, stock, category, imageUrl, description 
      } = req.body

      const inputProduct = { title, type }
        
    try {
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
        ProductId: addDetail.id,
        name: addDetail.name,
        stock: addDetail.stock,
        price: addDetail.price,
        description: addDetail.description,
        category: addDetail.category,
        imageUrl: addDetail.imageUrl,
      })

    } catch (err) {
      next (err)
      await transaction.rollback()
    }
  }

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
      if(result.length === 0) {
        res.status(200).json({msg: "There is no product"})
      }
      res.status(200).json(result)
    } catch (err) {
      console.log(err)
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
      if (id == 1 || id == 2) {
        
        res.status(200).json({msg: "you can't update product"})
      }
      const find = await Product.findOne({
        where: {id},
      })
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
      // if (id == 1 || id == 2) {
      //   res.status(200).json({msg: "you can't delete product"})
      // }
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

  static addDetail =  async(req, res, next) => {
    const t = await sequelize.transaction()
    try {
      const {ProductId, name, price, stock, category, imageUrl, description} = req.body
      const input = {ProductId, name, price, stock, category, imageUrl, description}
      const result = await DetailProduct.create(input, {transaction:t})
      res.status(201).json(result)
      await t.commit()

    } catch (err) {
      next (err)
      await t.rollBack()
    }
  }


  static showDetailById = async(req,res,next) =>{
    try {
      const {id} = req.params
      const ProductId = id
      const result = await DetailProduct.findOne({where: {ProductId}})
      console.log(result);
      if (!result) {
        throw {name: "Product_not_found"}
      } 
      res.status(200).json(result)
    } catch (err) {
      console.log(err);
      next(err)
    }
  }

  static updateDetail = async(req,res,next) => {
    const {ProductId, name, price, stock, category, imageUrl, description} = req.body
    const t = await sequelize.transaction()
    try {
      const {id} = req.params
      if (id == 1 || id == 2) {
        const input = {price}
        const find = await DetailProduct.findByPk(id)
        if(!find) {
          throw {name: "Product_not_found"}
        }
        const result = await DetailProduct.update(input, {where: {id}, returning:true, transaction:t})
        res.status(200).json(result)   
        await t.commit()
      } else {
        const input = {ProductId, name, price, stock, category,imageUrl, description}
        const find = await DetailProduct.findByPk(id)
        if(!find) {
          throw {name: "Product_not_found"}
        }
        const result = await DetailProduct.update(input, {where: {id}, returning:true, transaction:t})
        res.status(200).json(result)   
        await t.commit()
      }
    } catch (err) {
      next(err)
      await t.rollBack()
    }
  }

  static deleteDetail = async (req,res,next) =>{
    const {id} = req.params
    const t = await sequelize.transaction()
    try {
      if (id == 1 || id == 2) {
        res.status(200).json({msg: "you can't delete product"})
      } else {
        const find = await DetailProduct.findByPk(id)
        if (!find) {
          throw {name: "Product_not_found"}
        }
        const result = await DetailProduct.destroy ({where : {id}, transaction:t})
        res.status(200).json({message: "Success Delete Product"})
        await t.commit()

      }
    } catch (err) {
      next(err)
      await t.rollback()

    }
  }
}