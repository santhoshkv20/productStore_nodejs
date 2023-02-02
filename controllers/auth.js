const bcrypt = require("bcryptjs")
const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  // const isLoggedIn = req.get("Cookie").split(";")[1].trim().split("=")[1]==="true"
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isLoggedIn: false
  });
};

exports.getSignup = (req, res, next) => {
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    isLoggedIn: false
  });
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  User.findOne({ email: email })
    .then(userDoc => {
      if (userDoc) {
        return res.redirect('/signup');
      }
      return bcrypt.hash(password, 12)
        .then(hashedPassword => {
          const user = new User({
            email: email,
            password: hashedPassword,
            cart: { items: [] }
          });
          return user.save();
        })
        .then(result => {
          res.redirect('/login');
        })
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postLogin = (req, res) => {
  const {email,password} = req.body
  User.findOne({email:email})
    .then(user => {
      if(!user){
        return res.redirect("/login")
      }
      bcrypt.compare(password,user.password)
      .then(doMatch=>{
        if(doMatch){
          req.session.isLoggedIn = true;
          req.session.user = user;
          return req.session.user.save().then(err => {
             res.redirect("/");
          })
        }
         return res.redirect("/login")
      }) 
      .catch(err=>{
        res.redirect("/login")
      })    
  })
}

  exports.postLogout = (req, res) => {
    req.session.destroy((err)=>{
      res.redirect("/")

    })
    
 
  // res.setHeader("Set-Cookie", "isLoggedIn=true")

  }
