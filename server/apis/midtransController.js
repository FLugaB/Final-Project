const { Transaction, OrderProduct } = require(`../models`)
const axios = require('axios')

const SANDBOX_BASE_URL = "https://app.sandbox.midtrans.com"

const requestSnapToken = async (req, res, next) => {

    try {
        
        const AUTH_STRING = Buffer.from(`${process.env.MID_SERVER_KEY}:`).toString('base64')

        const headers = {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization : `Basic ${AUTH_STRING}`,
        }

        console.log(req.user.checkout.order_id, req.user.checkout.ammount)
        
        const parameter = {
            "transaction_details": {
              "order_id": req.user.checkout.order_id, // OrderId Must Unique
              "gross_amount": req.user.checkout.ammount // Total Ammount
            }
          }

        const response = await axios.post( 
            `${SANDBOX_BASE_URL}/snap/v1/transactions`, 
            parameter, 
            {
                headers: headers
            }
        )

        const snap_token = response.data
        
        res.status(200).json({
            snap_token
        })
        
    } catch (error) {
        next(error)
    }
}

const updateStatusTransactions = async (req, res, next) => {

    try {

        const { orderId } = req.params

        if (!orderId) throw { name: "TRANSACTION_NOT_FOUND" }

        const findTransaction = await Transaction.findOne({
            where: {
                order_id: orderId
            }
        })

        console.log(findTransaction)

        if (!findTransaction) throw { name: "TRANSACTION_NOT_FOUND" }

        let AUTH_STRING = Buffer.from(`${process.env.MID_SERVER_KEY}:`).toString('base64')

        const headers = {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization : `Basic ${AUTH_STRING}`,
        }        

        const response = await axios.get( 
            `https://api.sandbox.midtrans.com/v2/${orderId}/status`,  
            {
                headers: headers
            }
        )

        const status = response.data
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

        if (!newStatus) throw { name: "PLEASE_PAY_FIRST" }

        await OrderProduct.update(
            {
                status: `completed`
            },
            {
                where: {
                    UserId: req.auth.id,
                }
            }
        )

        const findOneOrderId = await Transaction.update(
            {
                status: newStatus
            },
            {
            where: {
                order_id: orderId
            },
            returning: true
        })

        const result = findOneOrderId[1]

        res.status(200).json({
            result
        })
        
    } catch (error) {
        console.log(error)
        next(error)
    }
}

module.exports = {
    requestSnapToken,
    updateStatusTransactions
}