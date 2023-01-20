const fs = require("fs")
const path = require("path")
const Cart = require("./cart")
const products = []

const p = path.join(path.dirname(require.main.filename), "data", "products.json")

const getProductFromFile = cb => {
    fs.readFile(p, (err, fileContent) => {
        if (!err) {
            return cb(JSON.parse(fileContent));
        }
        else cb([])
    })
}

module.exports = class Product {
    constructor(productId,title,description,imageUrl,price) {
        this.productId = productId;
        this.title = title;
        this.description = description;
        this.imageUrl = imageUrl;
        this.price = price;
    }

    save() {

        this.id = Math.random().toString();
        getProductFromFile(products => {
            if (this.productId) {
                const productIndex = products.findIndex(p => p.id === this.productId)
                const updatedProduct = [...products];
                updatedProduct[productIndex] = this;
                fs.writeFile(p, JSON.stringify(updatedProduct), (err) => {
                    console.log(err)
                })
            }
            else {
                products.push(this)
                fs.writeFile(p, JSON.stringify(products), (err) => {
                    console.log(err)
                })
            }
        });

    }

    static fetchAll(cb) {
        getProductFromFile(cb)
    }

    static fetchById(id, cb) {
        getProductFromFile((products) => {
            const product = products.find(p => p.id === id)
            cb(product)
        })
    }

    static deletById(id){
        getProductFromFile(products=>{
            const product = products.find(prod=>id==prod.id)
            const updatedProduct = products.filter(p =>p.id !== id);
            fs.writeFile(p, JSON.stringify(updatedProduct), (err) => {
                console.log(err)
                Cart.deleteProduct(id,product.price)
            })
        })
    }
}