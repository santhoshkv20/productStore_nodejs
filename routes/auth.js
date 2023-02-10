const express = require('express');

const {check, body} = require("express-validator")

const authController = require('../controllers/auth');
const User = require("../models/user")

const router = express.Router();

router.get('/login', authController.getLogin);
router.post('/login',
check("email","Email is not valid").isEmail(), 
authController.postLogin);
router.post('/logout', authController.postLogout);

router.post('/signup',
    check("email").isEmail().withMessage("Email is not valid")
        .custom((value, { req }) => {
            return User.findOne({ email: value })
                .then(userDoc => {
                    if (userDoc) {
                        return Promise.reject("E-Mail exists already, please pick a different one.")
                    }
                })
        }),
        
    check("password",
        "please enterpassword with length atleast 8 and only alpha numeric")
        .isLength({ min: 8 })
        .isAlphanumeric(),

    body("confirmPassword").custom((value, { req }) => {
        if (value != req.body.password) {
            throw new Error("Password does not match")
        }
        return true
    }),
authController.postSignup);
router.get('/signup', authController.getSignup);
router.get('/reset', authController.getreset);
router.post('/reset', authController.postResetPassword);
router.get('/reset/:token', authController.getNewPassword);
router.post('/new-password', authController.postNewPassword);
module.exports = router;