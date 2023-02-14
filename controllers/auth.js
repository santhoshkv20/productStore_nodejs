const crypto = require("crypto");
const bcrypt = require("bcryptjs")
var nodemailer = require('nodemailer');
const User = require("../models/user");
const { validationResult } = require("express-validator");

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'skv8492@gmail.com',
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
    errorMessage:message,
    oldData:{email:"",password:""},
    validationError:[]

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
    errorMessage: message,
    oldData: { email:"", password:"", confirmPassword: "" },
    validationError:[]

  });
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const errors  = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(422).render('auth/signup', {
      path: '/signup',
      pageTitle: 'Signup',
      errorMessage: errors.array()[0].msg,
      oldData: { email, password, confirmPassword: req.body.confirmPassword },
      validationError:errors.array()
    });
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
    
        .catch(err => {
          const error =  new Error(err)
          error.httpStatusCode = 500
          return next(error)
        });
};

exports.postLogin = (req, res) => {
  const {email,password} = req.body
  const errors  = validationResult(req);
  if(!errors.isEmpty())
  {
    return res.status(422).render('auth/login', {
      path: '/login',
      pageTitle: 'Login',
      errorMessage: errors.array()[0].msg,
      oldData:{email,password},
      validationError:errors.array()
    });
  }
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
        return res.status(422).render('auth/login', {
          path: '/login',
          pageTitle: 'Login',
          errorMessage: "Invalid email or password.",
          oldData:{email:email,password},
          validationError:errors.array()
        });
      }) 
      .catch(err=>{
        console.log(err)
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

  exports.getreset = (req,res)=>{
    let message = req.flash('error');
    if (message.length > 0) {
      message = message[0];
    } else {
      message = null;
    }

    res.render('auth/reset', {
      path: '/reset',
      pageTitle: 'reset',
      errorMessage: message
    });
  }

exports.postResetPassword = (req, res) => {
  crypto.randomBytes(32, (err, buffer) => {
    if(err){ 
      console.log("err",err)
      return res.redirect("/reset");
  }
    const token = buffer.toString("hex")
    User.findOne({ email: req.body.email }).then(user => {
      if (!user) {
        req.flash("error", "user with this email not found")
        return res.redirect("/reset");
      }
      user.resetToken = token;
      user.resetTokenExpire = Date.now() + 3600000
       user.save()
       .then(result => {
        res.redirect("/");
  
        transporter.sendMail({
          from: 'productStore@store.com',
          to: req.body.email,
          subject: "Password reset",
          text: `
          <p>You requested for password reset</p>
          <p>Click this <a  href="http://localhost:30001/reset/${token}>link</a> to set new password</p> `
        }, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        })
  
      });


    })
    .catch(err => {
      const error =  new Error(err)
      error.httpStatusCode = 500
      return next(error)
    });
    
  })
}

exports.getNewPassword = (req,res)=>{
  const token = req.params.token;
  User.findOne({resetToken:token,resetTokenExpire:{$gt:Date.now()}})
  .then(user=>{
    if(!user){
      req.flash("error","Rest password link is expired")
      return res.redirect("/reset")
    }
    let message = req.flash('error');
    if (message.length > 0) {
      message = message[0];
    } else {
      message = null;
    }
    res.render('auth/new-password', {
      path: '/new-password',
      pageTitle: 'new-password',
      errorMessage: message,
      userId:user._id.toString(),
      resetToken:token
    });
  })
  .catch(err => {
    const error =  new Error(err)
    error.httpStatusCode = 500
    return next(error)
  });
  
}

exports.postNewPassword = (req, res) => {
  const { userId, password, confirmedPassword, resetToken } = req.body
  let resetUser;
  User.findOne({
    _id: userId,
    resetToken: resetToken,
    resetTokenExpire: { $gt: Date.now() }
  }).then(user => {
    if(!user){
      req.flash("error","something went wrong")
      return res.redirect("/login")
    }else{
      resetUser = user;
      bcrypt.hash(password, 12)
        .then(hashPassword => {
          resetUser.password = hashPassword
          resetUser.resetToken = undefined;
          resetUser.resetTokenExpire = undefined
          return resetUser.save();
        }).then(user => {
          res.redirect("/login")
      })
    }
  })
  .catch(err => {
    const error =  new Error(err)
    error.httpStatusCode = 500
    return next(error)
  });
}
