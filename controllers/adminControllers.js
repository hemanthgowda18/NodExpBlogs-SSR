const { loginWrapper, signupWrapper } = require("../utils/auth");
const Admin = require("../models/Admin");

const login = loginWrapper(Admin);
const signup = signupWrapper(Admin);
<<<<<<< HEAD
const getSignup=(req,res)=>{
  res.render("adminSignup")
}
const getLogin=(req,res)=>{
  res.render("adminLogin")
}
=======
>>>>>>> a2f4893c1a4e905cc3f7a04042fabc672004d9bd

module.exports = {
  login,
  signup,
<<<<<<< HEAD
  getSignup,
  getLogin
=======
>>>>>>> a2f4893c1a4e905cc3f7a04042fabc672004d9bd
};
