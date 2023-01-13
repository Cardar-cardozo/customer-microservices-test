const pool = require("../../models/database"); 
const { validationResult } = require('express-validator');
const { v4: uuidv4 } = require("uuid");

exports.createOrder = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array() });
    }

    const { price} = req.body;

    try {

        console.log(req.user)
        
    const orderId = uuidv4();
    const itemId = uuidv4();
    const customerId = req.user.id;

              const orderQuery = `INSERT INTO orders (orderId,customerId, itemId, price) VALUES (?, ?, ?, ?)`;
              const orderValue = [orderId,customerId, itemId, price];
              pool.query(orderQuery, orderValue, (err, result) => {
              if (result) {
                return res.status(400).json({
                    status: "success",
                  data: {
                    orderId,
                    price,
                    itemId,
                  },
                  message: "Order successfully created",
                });
              } else {
                console.log(err)
                return res.status(400).json({
                  status: "error",
                  error: "Unable to create an order at the moment, Pls try again later.",
                });
              }
            });
        
    } catch (error) {
        console.log(error)
      return res.status(500).send({message:'server error', status:500});
    }
}

exports.updateOrder = async (req, res) =>{
    const orderId = parseInt(req.params.id);
    try {
        const check = `SELECT * FROM orders WHERE orderId=?`;
        const checkValue = [orderId];
        pool.query(check, checkValue, async (err, result) => {
            if (result.length == 0) {
                return res.status(400).json({
                    status: "error",
                    error: "order does not exist",
                });
            }
    })

    const orderStatus = 'delivered'
    const modify = `UPDATE orders SET orderStatus=? WHERE orderId=?`;
    const values = [orderStatus, orderId];
    pool.query(modify, values, (err, updated) => {
        console.log("updateddd", updated)
        if (updated) {
            return res.status(200).json({
                    status: 'success',
                    data: {
                        message: 'Order successfully updated',
                        updated
                    }
                });
            } else {
            return res.status(400).json({
                status: "error",
                error: "Unable to update Order at the moment, Pls try again later.",
            });
        }
    })

    } catch (error) {
        console.log(error)
        return res.status(500).send({message:'server error', status:500});
    }
}