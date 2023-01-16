const express = require("express")
const router = express.Router();
const path = require("path");
const { getProduct } = require("../controllers/products");

const rootDir = require("../util/path");
const { product } = require("./admin");

router.get("/",getProduct)
router.get("/products")
router.get("/cart")
router.get("/checkout");

module.exports = router