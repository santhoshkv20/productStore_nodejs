const mongodb = require("mongodb")
const mongodbClient = mongodb.MongoClient
let _db;
const mongoClient = (callback)=>{
  mongodbClient.connect("mongodb+srv://skv201:m4xgrRaIgzdmahea@cluster0.5yjzbfs.mongodb.net/backendLearning?retryWrites=true&w=majority")
  .then(res=>{
  console.log('connected')
  _db = res.db();
  callback()
  }).catch(err=>{
    console.log(err)
  })
}

const getdb=()=>{
if(_db){
  return _db
}
throw "no database"
}
exports.mongoClient = mongoClient;
exports.getdb = getdb


