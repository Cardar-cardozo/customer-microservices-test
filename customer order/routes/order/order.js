const express = require("express");
const authMiddleware = require("../../middlewares/auth");
const { check } = require("express-validator");

//Importing express router
const router = express.Router();

const orderController = require("../../controller/order/order");

router.post(
    "/createOrder",
    [
        //Validation rules
        check("price")
            .trim()
            .escape()
            .not()
            .isEmpty()
            .withMessage("price required")
            .isLength({
                min: 2,
            })
            .withMessage("min of 2 characters required"),

    ],
    authMiddleware,
    orderController.createOrder
);

router.patch('/updateOrder/:id',  authMiddleware, orderController.updateOrder)

module.exports = router;