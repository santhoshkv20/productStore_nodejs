const getDb = require("../util/database").getdb
const mongodb = require("mongodb")
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
    return db.collection("products")
      .find({}).toArray().then(data => {
        return data
      })
  }
  static fetchById(id){
    const db = getDb();
    console.log("jseh")
    return db.collection("products").find({_id:new mongodb.ObjectId( id)}).toArray().then(data=>{
      console.log("llerj",data)
      return data
    })
  }
}
module.exports = Product
