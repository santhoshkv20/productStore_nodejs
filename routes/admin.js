const express = require("express")
const router = express.Router()
const path = require("path");


router.get("/add-product", (req, res, next) => {
    res.sendFile(path.join( __dirname,"../","views","add-product.html"))
})

router.post("/add-product", (req, res, next) => {
    res.redirect("/")
})

module.exports = router;