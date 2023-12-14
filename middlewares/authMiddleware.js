const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Admin=require("../models/Admin")
const Author=require("../models/Author")
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const CustomError = require("../utils/CustomError");
const auth = asyncErrorHandler(async (req, res, next) => {
 let token=req.cookies.jwt
  if (!token) {
    const err = new CustomError(401, "Try Logging in,to Access");
    return next(err);
  }
  const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
  let Models = [User, Admin, Author];
  let users = Models.map(async (Model) => {
    let users = await Model.findById(decodedToken.id);
    return users;
  });

  users = await Promise.all(users);
  let authorizedUser = users.filter((doc) => doc !== null);
  if (!authorizedUser[0]) {
    const err = new CustomError(401, "User No Longer Exists");
    return next(err);
  }
  req.user = authorizedUser[0];
  next();
});

const verifyRole = (role) => {
  return (req, res, next) => {
    if (!role.includes(req.user.role)) {
      const err = new CustomError(401, "youre not Authorized");
      return next(err);
    }
    next();
  };
};
module.exports = { auth, verifyRole };
