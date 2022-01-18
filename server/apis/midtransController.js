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
        
        const parameter = {
            "transaction_details": {
              "order_id": "FF-02", // OrderId Must Unique
              "gross_amount": 1000000 // Total Ammount
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
        console.log(error)
    }
}

module.exports = {
    requestSnapToken
}