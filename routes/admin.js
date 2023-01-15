const path = require('path');

const express = require('express');

const rootDir = require('../util/path');
const { getAddproduct, postAddProduct } = require('../controllers/products');

const router = express.Router();


// /admin/add-product => GET
router.get('/add-product', getAddproduct)

// /admin/add-product => POST
router.post('/add-product', postAddProduct)

module.exports = {router};