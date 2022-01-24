const {OrderProduct, sequelize} = require("../models")
const {Product, DetailProduct} = require("../models")

module.exports = class Controller {

  static addClientCart =  async(req, res, next) =>{
    const t = await sequelize.transaction()
    try {
      const {id} = req.params

      const getProduct = await DetailProduct.findOne({where: {id}})
      if (!getProduct || getProduct.length < 1) {
        throw {name: "Product_not_found"}
      }
      const input = {UserId: req.auth.id, ProductId: getProduct.id, status:'pending'}
      const result = await OrderProduct.create(input, {transaction:t})
      res.status(201).json(result)
      await t.commit()
    } catch (err) {
      next (err)
      await t.rollback()
    }
  }

  static deleteClientCart = async (req,res,next) =>{
    const {id} = req.params
    const t = await sequelize.transaction()
    try {
      const find = await OrderProduct.findByPk(id)
      if (!find) {
        throw {name: "Order_not_found"}
      }
      const result = await OrderProduct.destroy ({where : {id}, transaction:t})
      await t.commit()
      res.status(200).json({message: "Success Delete Product"})
    } catch (err) {
      await t.rollback()
      next(err)
    }
  }
}