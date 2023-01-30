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
    if (!this.cart.items) this.cart.items = []
    const cartProductIndex = this.cart.items.findIndex(cp => {
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

  getCart() {
    const db = getdb();
    const productId = this.cart.items.map(i => {
      return i.productId
    })

    return db.collection("products").find({ _id: { $in: productId } })
      .toArray()
      .then(produts => {
        return produts.map(p => {
          return {
            ...p,
            quantity: this.cart.items.find(i => {
              return i.productId.toString() === p._id.toString()
            }).quantity
          }
        })
      })
  }

  deleteFromCart(id){
    const updatedCart = this.cart.items.filter(c => {
      return c.productId.toString() !== id.toString()
    })
    const db  = getdb();
    return db.collection("users")
    .updateOne({_id:new mongoDb.ObjectId( this._id)},
    {$set:{cart:{items:updatedCart}}}).then(result=>{
      return result
    })
  }
  postOrder(){
    const db = getdb();
   return this.getCart()
   .then(products=>{
      const order={items:products,
      user:{
        _id:new mongoDb.ObjectId( this._id),
        name:this.name
      }
    };
    return db.collection("orders").insertOne(order)
  })
  .then(result=>{
      this.cart = { items: [] }
      return db
      .collection("users")
      .updateOne(
        { _id: new mongoDb.ObjectId(this._id) }, 
      { $set: { cart: { items: [] } } })
    })

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
