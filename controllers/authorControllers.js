const { loginWrapper, signupWrapper } = require("../utils/auth");
const Author = require("../models/Author");

const login = loginWrapper(Author);
const signup = signupWrapper(Author);
<<<<<<< HEAD
const getSignup = (req, res) => {
  res.render("authorSignup");
};
const getLogin=(req,res)=>{
  res.render("authorLogin")
}
=======
>>>>>>> a2f4893c1a4e905cc3f7a04042fabc672004d9bd

module.exports = {
  login,
  signup,
<<<<<<< HEAD
 getSignup,
 getLogin
}
=======
};
>>>>>>> a2f4893c1a4e905cc3f7a04042fabc672004d9bd
