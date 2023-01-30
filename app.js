const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

// const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const User = require('./models/user');
const mongoClient = require('./util/database').mongoClient;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

 app.use((req, res, next) => {
  User.findById("63d2538a850a8d8284a14602")
    .then(user => {
      let rest = new User( user.name,user.email,user.cart,user._id)
       req.user = rest
      // console.log("user",req.user)
      next();
    })
    .catch(err => console.log(err));
 });

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);
mongoClient(()=>{
  app.listen(3000)
})


