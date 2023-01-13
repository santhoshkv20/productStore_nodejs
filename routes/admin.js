const express = require("express")
const router = express.Router()


router.get("/add-product", (req, res, next) => {
    res.send('<form action="/admin/product" method = "POST" ><input type="text name="title"></input> <button type = "submit">submit</button></form>')
})

router.post("/product", (req, res, next) => {
    res.redirect("/")
})

module.exports = router;