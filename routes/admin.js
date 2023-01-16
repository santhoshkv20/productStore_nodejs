const path = require('path');

const express = require('express');

const rootDir = require('../util/path');
const { getAddproduct, postAddProduct, getProducts } = require('../controllers/admin');

const router = express.Router();


// /admin/add-product => GET
router.get('/add-product', getAddproduct)
router.get('/products',getProducts)

// /admin/add-product => POST
router.post('/add-product', postAddProduct)

module.exports = {router};