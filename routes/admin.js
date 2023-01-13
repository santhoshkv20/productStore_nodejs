const express = require("express")
const router = express.Router()
const path = require("path");
const rootDir = require("../util/path")

console.log(rootDir)
const product =[]
router.get("/add-product", (req, res, next) => {
    res.sendFile(path.join(rootDir,"views","add-product.html"))
})

router.post("/add-product", (req, res, next) => {
    console.log(req.body)
    product.push({title:req.body.title})
    res.redirect("/")
})

module.exports = {router,product};