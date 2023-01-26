const { getdb } = require("../util/database");
const mongoDb = require("mongodb")

class User{
  constructor(userName,email){
    this.name = userName;

    this.email = email;
  }

  save() {
    const db = getdb();
    return db.collection("users").insertOne(this).then(user=>{
      console.log(user)
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
