const express = require("express")
const path = require("path")
const bodyParser = require("body-parser");
const adminRouter = require("./routes/admin");
const shopRouter = require("./routes/shop");


const app = express();
app.use(bodyParser.urlencoded({extended:false}))
app.set("view engine","pug")
app.set("views","views")


app.use("/admin",adminRouter.router)
app.use(shopRouter)
app.use(express.static(path.join(__dirname,"public")))

app.use((req,res,next)=>{
res.sendFile(path.join(__dirname,"views","pageNotFound.html"))
})
app.listen(3000);