const user = require("../models/user");

exports.getLogin = (req, res, next) => {
  // const isLoggedIn = req.get("Cookie").split(";")[1].trim().split("=")[1]==="true"
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isLoggedIn: false
  });
};

exports.postLogin = (req, res) => {
  user.findById('63d8bf921483e03dfd7ad457')
    .then(user => {
      console.log(user)
      req.session.isLoggedIn = true;
      req.session.user = user;
      res.redirect("/");
  })
}

  exports.postLogout = (req, res) => {
    req.session.destroy((err)=>{
      res.redirect("/")

    })
    
 
  // res.setHeader("Set-Cookie", "isLoggedIn=true")

  }
