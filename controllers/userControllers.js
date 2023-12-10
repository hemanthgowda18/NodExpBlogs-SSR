const {loginWrapper,signupWrapper}=require("../utils/auth")
const User=require("../models/User")

<<<<<<< HEAD

const login=loginWrapper(User)
const signup=signupWrapper(User)
const getSignup = (req, res) => {
  res.render("userSignup");
};
const getLogin=(req,res)=>{
  res.render("userLogin")
}

module.exports={
  login,signup,getSignup,getLogin
=======

const login=loginWrapper(User)
const signup=signupWrapper(User)

module.exports={
  login,signup
>>>>>>> a2f4893c1a4e905cc3f7a04042fabc672004d9bd
}