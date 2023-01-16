const fs = require("fs")
const path = require("path")
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
    constructor(title,description,imageUrl,price) {
        this.title = title;
        this.description = description;
        this.imageUrl = imageUrl;
        this.price = price;
    }

    save() {
        this.id = Math.random().toString();
        getProductFromFile(products => {
            products.push(this)
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err)
            })
        });
    }

    static fetchAll(cb) {
        getProductFromFile(cb)
    }
}