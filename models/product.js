const getDb = require("../util/database").getdb
const mongodb = require("mongodb")
class Product {
  constructor(title, price, description, imageUrl,id) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this.id =id? new mongodb.ObjectId(id):null;
  }
  save() {
    const db = getDb()
    let dataOp;
    if (this.id) {
      console.log(this._id)
      dataOp = db.collection("products").updateOne({ _id: this.id },{$set:this});

      dataOp.then(data=>{
        console.log(data)
      })
      .catch(err=>{
        console.log("err,",err)
      })
    }
    else {
      dataOp = db.collection("products").insertOne(this)
    }
    return dataOp
      .then(data => {
        console.log("data", data)
        return data
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
    //console.log("jseh")
    return db.collection("products").find({_id:new mongodb.ObjectId( id)}).toArray().then(data=>{
  //    console.log("llerj",data)
      return data
    })
  }

  static deletetById(id){
    const db  = getDb();
    console.log(new mongodb.ObjectId( id))
    return db.collection("products").deleteOne({_id:new mongodb.ObjectId( id)}).then(data => {
      return data
    })
  }
}
module.exports = Product
