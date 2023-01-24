const mongodb = require("mongodb")
const mongodbClient = mongodb.MongoClient
const mongoClient = (callback)=>{
  mongodbClient.connect("mongodb+srv://skv201:m4xgrRaIgzdmahea@cluster0.5yjzbfs.mongodb.net/?retryWrites=true&w=majority")
  .then(res=>{
  console.log('connected')
  callback(res)
  }).catch(err=>{
    console.log(err)
  })
}
module.exports = mongoClient


