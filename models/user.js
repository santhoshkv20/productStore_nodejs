const { getdb } = require("../util/database");
const mongoDb = require("mongodb")

class User{
  constructor(userName,email,cart,id){
    this.name = userName;

    this.email = email;
    this.cart = cart?cart:{}
    this._id=id
  }

  save() {
    const db = getdb();
    return db.collection("users").insertOne(this).then(user=>{
      console.log(user)
    })
  }

  addToCart(product) {
    if(!this.cart.items)this.cart.items = []
    const cartProductIndex = this.cart.items.findIndex(cp => {
console.log("product",product[0]._id,cp.productId)
      return cp.productId.toString() === product[0]._id.toString();
    });
    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];

    if (cartProductIndex >= 0) {
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
      console.log()
      updatedCartItems.push({
        productId: new mongoDb.ObjectId(product[0]._id),
        quantity: newQuantity
      });
    }
    const updatedCart = {
      items: updatedCartItems
    };
    const db = getdb();
    return db
      .collection('users')
      .updateOne(
        { _id: new mongoDb. ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      );
  }

  static findById(id){
    const db = getdb();
    return db.collection("users").findOne({_id:new mongoDb.ObjectId(id)}).then(user=>{
      console.log(user)
      return user
    })
    
  }

}

module.exports = User;
