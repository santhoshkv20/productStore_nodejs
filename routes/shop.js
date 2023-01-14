const express = require("express")
const router = express.Router();
const path = require("path")

const rootDir = require("../util/path");
const { product } = require("./admin");

router.get("/", (req, res, next) => {
    res.render("shop",{prods:product})
})

module.exports = router