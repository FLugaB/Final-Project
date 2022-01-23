const { Product, DetailProduct, OrderProduct, Transaction, Voucher } = require("../models")
const { Op } = require("sequelize");

class TransactionController {

    static ticketConsultation =  async(req, res, next) => {

      try {

        // const findTicket = await Product.findOne({
        //     where: {
        //         type: {
        //             [Op.iLike]: '%Ticket Chat'
        //         }
        //     }
        // })
        const getProduct = await DetailProduct.findOne({where: {
            ProductId:1
        }})

        if (!getProduct) {
            throw {name: "Product_not_found"}
        }
        
        const result = await OrderProduct.create({
            UserId: req.auth.id,
            ProductId: getProduct.id,
            status: 'pending'
        })

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
                    [Op.and]: [
                        { UserId: req.auth.id }, 
                        { status: `pending` }
                    ], 
                },
                include: [
                    {
                        
                        model: DetailProduct,
                        attributes: {
                            exclude: ['createdAt', `updatedAt`, ]
                        }
                         
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
                        
                        model: DetailProduct,
                        attributes: {
                            exclude: ['createdAt', `updatedAt`, ]
                        }
                         
                    }, 
                ]
            })

            if (findUserOrder.length < 1) {
                throw { name: "NO_ITEM_ON_CART" }
            }
            let orderDetail = { 
                totalPrice: 0,
                product: [],
            }
            
            findUserOrder.forEach((el, index) => { 
                orderDetail.totalPrice += findUserOrder[index].DetailProduct.price
                orderDetail.product.push(el)
            })

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
            console.log(error,"<<<<<<<<<<<< ERROR")
            next(error)
        }
    }

    static checkoutMid = async (req, res, next) => {

        try {
            const response = await Transaction.findOne({
                where: {
                    // [Op.or]: [{
                    //     [Op.and]: [
                    //         { UserId: req.auth.id }, 
                    //         { status: `pending` }
                    //     ],
                    //     [Op.and]: [
                    //         { UserId: req.auth.id }, 
                    //         { status: `failed` }
                    //     ]
                    // }]
                    [Op.and]: [
                        { UserId: req.auth.id }, 
                        { status: `pending` }
                    ],
                    
                },
                attributes: {
                    exclude: ['createdAt', `updatedAt`]
                },    
            })  
            
            if (!response) throw { name: `NOT_FOUND_ORDER`}
    
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

    static notificationTransaction = async (req, res, next) => {
        try {
            
            const status = req.body

            console.log(status)

            const findTransaction = await Transaction.findOne({
                where: {
                    order_id: status.order_id
                }
            })

            if (!findTransaction) throw { name: "TRANSACTION_NOT_FOUND" }

            let newStatus;

            if (status.status_code === 404) {
                newStatus = `failed`
            }

            if (status.transaction_status === `expire` || 
                status.transaction_status === `cancel` ||
                status.transaction_status === `deny`) {
                newStatus = `failed`
            } else if ( status.transaction_status === `settlement` ||
                        status.transaction_status === `capture`) {
                newStatus = `paid`
            } 
            // ini mestinya newStatus === 'failed' kan? bukan falsy
            if (!newStatus) throw { name: "PLEASE_PAY_FIRST" }

            const findOneOrderId = await Transaction.update(
                {
                    status: newStatus
                },
                {
                where: {
                    order_id: status.order_id
                },
                returning: true
            })

            const newVoucher = await Voucher.create({
                voucherToken: '',
                status: 'useable',
                DoctorId: null,
                ClientId: findOneOrderId[1][0].UserId,
                transactionId: findOneOrderId[1][0].id
            })

            console.log(status,"<<<<<<<<<<<<<<<<<<<<<<");
            res.status(200).json(findOneOrderId)
            
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

}

module.exports = {
    TransactionController
}