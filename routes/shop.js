const express = require("express")
const router = express.Router();
const path = require("path");
const { getProduct, getIndex, getCart, getCheckout, getOrders, getProductDetail, postCart, deletCartItem } = require("../controllers/shop");

const rootDir = require("../util/path");
const { product } = require("./admin");

router.get("/",getIndex)
router.get("/products",getProduct)
router.get("/products/:productId",getProductDetail)
router.get("/cart",getCart)
router.post("/cart-delete-item",deletCartItem);
router.post("/cart",postCart)
router.get("/checkout",getCheckout);
router.get("/orders",getOrders);

module.exports = router