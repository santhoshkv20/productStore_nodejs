exports.getLogin = (req, res, next) => {
  // const isLoggedIn = req.get("Cookie").split(";")[1].trim().split("=")[1]==="true"
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isLoggedIn: true
  });
};

exports.postLogin = (req, res) => {
  req.session.isLoggedIn = true
  // res.setHeader("Set-Cookie", "isLoggedIn=true")
  res.redirect("/");

}
