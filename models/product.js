const getDb = require("../util/database").getdb
class Product {
  constructor(title, price, description, imageUrl) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
  }
  save() {
    const db = getDb()
    return db.collection("products")
      .insertOne(this)
      .then(data => {
        console.log("data", data)
      })
      .catch(err => { })
  }
  static fetchAll() {
    const db = getDb()
    console.log(db.collection("products"))
    return db.collection("products")
      .find({}).toArray().then(data => {
        return data
      })
  }
}
module.exports = Product
