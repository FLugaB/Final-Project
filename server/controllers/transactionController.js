const { User, Product, DetailProduct, OrderProduct, Transaction, Voucher } = require("../models")
const { Op } = require("sequelize");

class TransactionController {

    static ticketConsultation =  async(req, res, next) => {

      try {

        const getProduct = await DetailProduct.findOne({
            where: {
                category: {
                    [Op.iLike]: '%Ticket'
                }
            }
        })
        
        // const getProduct = await DetailProduct.findOne({where: {
        //     ProductId:1
        // }})
        
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
                throw { name: 'NOT_FOUND_ORDER'}
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

            const findUserClient = await Voucher.findAll({
                where: {
                    [Op.and]: [
                        { ClientId: req.auth.id }, 
                        { status: `useable` }
                    ], 
                }
            })

            if (findUserClient.length < 1) {
                throw { name: 'NOT_FOUND_ORDER'}
            } else {
                res.status(200).json(findUserClient);
            }
            
        } catch (error) {
            console.log(error)
            next (error)
        }
    }

    static clientTicketsDoctors = async (req, res, next) => {

        try {

            const { DoctorId } = req.params
            
            const isDoctor = await User.findOne({
                where: {
                    [Op.and]:[
                        {role: 'Doctor'},
                        {id: DoctorId}
                    ]
                }
            })
            
            if (!isDoctor) {
                // res.status(404).json({ message: "not found"})
                throw { name: 'NOT_FOUND_DOCTOR'}
            }

            const findUserClient = await Voucher.findAll({
                where: {
                    [Op.and]: [
                        { ClientId: req.auth.id }, 
                        { status: `useable` }
                    ], 
                }
            })

            if (findUserClient.length < 1) {
                console.log(findUserClient,"<< CONTROLLER VOUCHER");
                res.status(200).json({ msg: `There is no Voucher Ticket`})
            } else {

                const patchUserVoucher = await Voucher.update(
                {
                    DoctorId,
                    voucherToken: `123`, // INI TOKEN DARI DAILY TOLONG LUDFI DIVANTUUU
                    status: 'used'
                },
                {
                    where: {
                        id: findUserClient[0].id
                    }
                },
                    { returning: true}
                )

                res.status(200).json(patchUserVoucher);
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
            
            // {
            //     "transaction_time": "2022-01-21 19:45:12",
            //     "transaction_status": "capture",
            //     "transaction_id": "9debe4e5-285b-4525-9bcd-d85fe123496a",
            //     "status_message": "midtrans payment notification",
            //     "status_code": "200",
            //     "signature_key": "939f6fff54821f0d466eb7be1182735676abf27478725507ae6c89a1826542e76d16716062daa0cc1fc39dd5811604ab70bec48ba3ed2683b04a0b10b7ed3d51",
            //     "payment_type": "credit_card",
            //     "order_id": "9um93c",
            //     "merchant_id": "G656665790",
            //     "masked_card": "481111-1114",
            //     "gross_amount": "240000.00",
            //     "fraud_status": "accept",
            //     "currency": "IDR",
            //     "channel_response_message": "Approved",
            //     "channel_response_code": "00",
            //     "card_type": "credit",
            //     "bank": "cimb",
            //     "approval_code": "1642769112700"
            //   }

            // "merchant_id": "G656665790", Verify Merchant Id <-----------
            
            const status = req.body

            const findTransaction = await Transaction.findOne({
                where: {
                    order_id: status.order_id
                }
            })

            if (!findTransaction) throw { name: "TRANSACTION_NOT_FOUND" }

            let newStatus;

            // if (status.status_code === 404) {
            //     newStatus = `failed`
            // }

            if (status.transaction_status === `expired` || 
                status.transaction_status === `cancel` ||
                status.transaction_status === `deny`) {
                newStatus = `failed`
            } else if ( status.transaction_status === `settlement` ||
                        status.transaction_status === `capture`) {
                newStatus = `paid`
            } else if (!status.transaction_status) throw { name: "PLEASE_PAY_FIRST" }

            const findCart = await OrderProduct.findAll(
                {
                    where: {
                        [Op.and]: [
                            { UserId: findTransaction.UserId }, 
                            { status: `pending` }
                        ], 
                    }
                }
            )

            let isTicket = findCart.map( (e) => {
                if (e.ProductId === 1) {
                    return {
                        voucherToken: '',
                        status: 'useable',
                        DoctorId: null,
                        ClientId: findTransaction.UserId,
                        transactionId: findTransaction.id
                    }
                }
            })

            const tryUpdateCart = await OrderProduct.update(
                {
                    status: `completed`
                },
                {
                    where: {
                        UserId: findTransaction.UserId,
                    }
                }
            )

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

            const newVoucher = await Voucher.bulkCreate(isTicket)

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