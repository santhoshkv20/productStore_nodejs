exports.getError=(req,res,next)=>{
    res.render("404",{pageTitle:"Pahe not found",path:'/'})

}