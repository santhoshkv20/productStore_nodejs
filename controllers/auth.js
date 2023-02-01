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
  const { email, password } = req.body;
  User.findOne({ email: email }).then(userDoc => {
    if (userDoc) {
      return res.redirect("/signup")
    }
    const user = User(
      {
        email: email,
        password: password,
        cart: { items: [] }

      })
    return user.save();
  })
    .then(user => {
      res.redirect("/login")
    })
};

exports.postLogin = (req, res) => {
  User.findOne({email:req.body.email})
    .then(user => {
      console.log(user)
      req.session.isLoggedIn = true;
      req.session.user = user;
      req.session.user.save().then(err=>{
        res.redirect("/");
      })
  })
}

  exports.postLogout = (req, res) => {
    req.session.destroy((err)=>{
      res.redirect("/")

    })
    
 
  // res.setHeader("Set-Cookie", "isLoggedIn=true")

  }
