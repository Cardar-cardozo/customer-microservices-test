const express = require("express");
const { check } = require("express-validator");

//Importing express router
const router = express.Router();

const signupController = require("../../controller/auth/auth");

router.post(
    "/signup",
    [
        //Validation rules
        check("firstName")
            .trim()
            .escape()
            .not()
            .isEmpty()
            .withMessage("First Name required")
            .isLength({
                min: 3,
            })
            .withMessage("min of 6 characters required"),
        check("lastName")
            .trim()
            .escape()
            .not()
            .isEmpty()
            .withMessage("Last Name required")
            .isLength({
                min: 3,
            })
            .withMessage("min of 6 characters required"),
        check("email")
            .trim()
            .not()
            .isEmpty()
            .withMessage("Email Address required")
            .isEmail()
            .normalizeEmail()
            .withMessage("Must be a valid email"),
        check("password")
            .not()
            .isEmpty()
            .withMessage("Password required")
            .isLength({ min: 5 })
            .withMessage("password must be minimum 5 length")
            .matches(/(?=.*?[A-Z])/)
            .withMessage("At least one Uppercase")
            .matches(/(?=.*?[a-z])/)
            .withMessage("At least one Lowercase")
            .matches(/(?=.*?[0-9])/)
            .withMessage("At least one Number")
            .matches(/(?=.*?[#?!@$%^&*-])/)
            .withMessage("At least one special character")
            .not()
            .matches(/^$|\s+/)
            .withMessage("White space not allowed"),
    ],
    signupController.registerUser
);

router.post('/login', [
        //Validation rules
        check('emailBody')
            .trim()
            .not()
            .isEmpty().withMessage('Email Address required')
            .isEmail()
            .normalizeEmail().withMessage('Must be a valid email'),
        check('passwordBody')
            .trim()
            .not()
            .isEmpty().withMessage('Password required')
], signupController.login)

module.exports = router;