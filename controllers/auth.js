const bcrypt = require("bcryptjs")
var nodemailer = require('nodemailer');
const User = require("../models/user");

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '',
    pass: ''
  }
});
exports.getLogin = (req, res, next) => {
  // const isLoggedIn = req.get("Cookie").split(";")[1].trim().split("=")[1]==="true"
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    errorMessage:message

  });
};

exports.getSignup = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    errorMessage: message
  });
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  User.findOne({ email: email })
    .then(userDoc => {
      if (userDoc) {
        req.flash('error', 'E-Mail exists already, please pick a different one.');
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
          var mailOptions = {
            from: 'productStore@store.com',
            to:email,
            subject: 'Sending Email using Node.js',
            text: 'That was easy!'
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
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
        req.flash("error","invalid email or password")
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
        req.flash('error', 'Invalid email or password.');
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
