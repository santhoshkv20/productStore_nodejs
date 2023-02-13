const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');
const {check, body} = require("express-validator")
const is_auth = require("../middleware/is-auth");

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product',is_auth, adminController.getAddProduct);

// /admin/products => GET
router.get('/products', is_auth,adminController.getProducts);

// /admin/add-product => POST
router.post('/add-product', [
    body("title").isString().isLength({ min: 4 }).trim().withMessage("Check title"),
    body("imageUrl").isURL().trim().withMessage("Check URL"),
    body("price").isFloat().withMessage("Price should have decimal"),
    body("description").isAlphanumeric().isLength({ min: 10 }).trim().withMessage("Description must be long")


], is_auth, adminController.postAddProduct);

router.get('/edit-product/:productId',is_auth, adminController.getEditProduct);

router.post('/edit-product', is_auth,adminController.postEditProduct);

router.post('/delete-product',is_auth, adminController.postDeleteProduct);

module.exports = router;
