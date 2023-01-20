const fs = require("fs")
const path = require("path")
const p = path.join(path.dirname(require.main.filename), "data", "cart.json")
const getProductFromFile = cb => {
    fs.readFile(p, (err, fileContent) => {
        if (!err) {
            return cb(JSON.parse(fileContent));
        }
        else cb(null)
    })
}
module.exports = class Cart{
static addProduct (id,productPrice){
    fs.readFile(p,(err,fileContent)=>{
        let cart = {products:[],totalPrice:0}
        if(!err){
            cart = JSON.parse(fileContent)
        }
        console.log(cart)
        const existingProductIndex = cart.products.findIndex(p=>p.id === id)
        const existingProduct = cart.products[existingProductIndex]
        let updateProduct;
        if(existingProduct){
            updateProduct = { ...existingProduct }
            updateProduct.qty+=1
             cart.products = [...cart.products]
            cart.products[existingProductIndex] = updateProduct
            console.log("kelkjl",updateProduct)
        }
        else{
            updateProduct = { id: id, qty: 1 }
            cart.products = [...cart.products,updateProduct]
        }
        cart.totalPrice += +productPrice
        fs.writeFile(p, JSON.stringify(cart), (err,) => {
            console.log(err)
        })
    })


}
static fetchAll(cb) {
    getProductFromFile(cb)
}


    static deleteProduct(id, productPrice) {
        fs.readFile(p, (err, fileContent) => {
          if (err) {
            return;
          }
          const updatedCart = { ...JSON.parse(fileContent) };
          const product = updatedCart.products.find(prod => prod.id === id);
          if (!product) {
              return;
          }
          const productQty = product.qty;
          updatedCart.products = updatedCart.products.filter(
            prod => prod.id !== id
          );
          updatedCart.totalPrice =
            updatedCart.totalPrice - productPrice * productQty;
    
          fs.writeFile(p, JSON.stringify(updatedCart), err => {
            console.log(err);
          });
        });
      }
}