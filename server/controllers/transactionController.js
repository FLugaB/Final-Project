const { Product, DetailProduct, OrderProduct, Transaction } = require("../models")
const { Op } = require("sequelize");

class TransactionController {

    static ticketConsultation =  async(req, res, next) => {

      try {

        const findTicket = await Product.findOne({
            where: {
                type: {
                    [Op.iLike]: '%Ticket Chat'
                }
            }
        })

        if (!findTicket) {
            throw {name: "Product_not_found"}
        }
        
        const result = await OrderProduct.create({
            UserId: req.auth.id,
            ProductId: findTicket.id,
            status: 'pending'
        })

        // const successText = "Checkout first before you could chat with our doctor"

        res.status(201).json({
            msg: "Checkout first before you could chat with our doctor",
            result
        });

      } catch (err) {
        console.log(err, `==============`)
        next (err)
      }

    }


    static clientCart = async (req, res, next) => {

        try {

            const findUserOrder = await OrderProduct.findAll({
                where: {
                    UserId: req.auth.id
                },
                include: [
                    {
                        model: Product,
                        attributes: {
                            exclude: ['createdAt', `updatedAt`, ]
                        },
                        include: [
                            {
                                model: DetailProduct,
                                attributes: {
                                    exclude: ['createdAt', `updatedAt`, ]
                                }
                            }, 
                        ]
                    }, 
                ]
            })

            if (findUserOrder.length < 1) {
                res.status(200).json({ msg: `there is no orders yet`})
            } else {
                res.status(200).json(findUserOrder);
            }
            
        } catch (error) {
            console.log(error)
            next (error)
        }
    }

    static clientTickets = async (req, res, next) => {

        try {

            const findUserOrder = await OrderProduct.findAll({
                where: {
                    [Op.and]: [
                        { UserId: req.auth.id }, 
                        { status: `completed` }
                    ], 
                },
                include: [
                    {
                        model: Product,
                        attributes: {
                            exclude: ['createdAt', `updatedAt`, ]
                        },
                        include: [
                            {
                                model: DetailProduct,
                                attributes: {
                                    exclude: ['createdAt', `updatedAt`, ]
                                }
                            }, 
                        ]
                    }, 
                ]
            })

            if (findUserOrder.length < 1) {
                res.status(200).json({ msg: `there is no orders yet`})
            } else {
                res.status(200).json(findUserOrder);
            }
            
        } catch (error) {
            console.log(error)
            next (error)
        }
    }

    static clientDetailCheckout = async (req, res, next) => {

        try {

            const findUserOrder = await OrderProduct.findAll({
                where: {
                    [Op.and]: [
                        { UserId: req.auth.id }, 
                        { status: `pending` }
                    ], 
                },
                include: [
                    {
                        model: Product,
                        attributes: {
                            exclude: ['createdAt', `updatedAt`, ]
                        },
                        include: [
                            {
                                model: DetailProduct,
                                attributes: {
                                    exclude: ['createdAt', `updatedAt`, ]
                                }
                            }, 
                        ]
                    }, 
                ]
            })

            if (findUserOrder.length < 1) throw { name: "NO_ITEM_ON_CART" }

            let orderDetail = { 
                totalPrice: 0,
                product: [],
             }

             findUserOrder.forEach(element => {
                orderDetail.totalPrice += element.Product.DetailProducts[0].price
                orderDetail.product.push(element.Product)
            });

            const findOrderID = await Transaction.findOne({
                where: {
                    [Op.and]: [
                        { UserId: req.auth.id }, 
                        { status: `pending` }
                    ], 
                }
            })

            if(findOrderID){
                orderDetail.order_id = findOrderID.order_id
                const HistoryLog = await Transaction.update({
                    ammount: orderDetail.totalPrice
                },{
                    where: {
                        id: findOrderID.id
                    }
                })
                res.status(200).json({orderDetail})
            } else {
                const HistoryLog = await Transaction.create({
                    order_id: `${req.auth.id}${(Math.random() + 1).toString(36).substring(7)}`,
                    UserId: req.auth.id,
                    status: `pending`,
                    ammount: orderDetail.totalPrice
                })

                orderDetail.order_id = HistoryLog.order_id

                res.status(201).json({orderDetail})
            }
            
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    static checkoutMid = async (req, res, next) => {

        try {

            const response = await Transaction.findOne({
                where: {
                    [Op.and]: [
                        { UserId: req.auth.id }, 
                        { status: `pending` }
                    ], 
                },
                attributes: {
                    exclude: ['createdAt', `updatedAt`]
                },    
            })  
            
            if (response.length < 1) throw { msg: `there is no orders yet`}
    
            const findOrderID = await Transaction.findOne({
                where: {
                    [Op.and]: [
                        { UserId: req.auth.id }, 
                        { status: `pending` }
                    ], 
                }
            })    

            req.user.checkout = findOrderID
            
            next()

        } catch (error) {
            next(error)
        }
    }

    static fetchStatusTransactions = async (req, res, next) => {

        try {

            const findAllTransactions = await Transaction.findAll({
                where: {
                    UserId: req.auth.id 
                }
            })

            res.status(200).json(findAllTransactions)
            
        } catch (error) {
            next()
        }
    }

}

module.exports = {
    TransactionController
}