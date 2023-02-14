const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const csrf = require("csurf")
const session = require('express-session');
const MongodbStore = require("connect-mongodb-session")(session);
const flash  = require("connect-flash");

const errorController = require('./controllers/error');
const User = require('./models/user');
const MONGODB_URI = process.env.MONGODB_URI
const csrfProtection = csrf();
const app = express();
const store = new MongodbStore({
  uri:MONGODB_URI,
  collection:"sessions"
})
console.log(process.env.PORT)
app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret:"qbshdhe",resave:false,saveUninitialized:false,store:store}))
app.use(csrfProtection)
app.use(flash())
app.use((req, res, next) => {
  if(!req.session.user)return next();
  User.findById(req.session.user._id)
    .then(user => {
      if(!user){
        return next();
      }
      req.user = user;
      next();
    })
    .catch(err =>{ 
      throw new Error(err)});
});
app.use((req,res,next)=>{
  res.locals.isLoggedIn = req.session.isLoggedIn
  res.locals.csrfToken = req.csrfToken();
  next();
})
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);
app.use("/500",errorController.get500)
app.use(errorController.get404);
app.use((error,req,res,next)=>{
  res.redirect("/500")
})

mongoose
  .connect(
    MONGODB_URI
  )
  .then(result => {
   
    app.listen(process.env.PORT);
  })
  .catch(err => {
    console.log(err);
  });
