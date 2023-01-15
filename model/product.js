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
    constructor(t) {
        this.title = t;
    }

    save() {
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