const express = require("express")
const router = express.Router();
const path = require("path");
const { getProduct, getIndex, getCart, getCheckout, getOrders } = require("../controllers/shop");

const rootDir = require("../util/path");
const { product } = require("./admin");

router.get("/",getIndex)
router.get("/products",getProduct)
router.get("/cart",getCart)
router.get("/checkout",getCheckout);
router.get("/orders",getOrders);

module.exports = router