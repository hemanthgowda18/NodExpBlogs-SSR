const router = require("express").Router();
<<<<<<< HEAD
const { signup, login, getSignup, getLogin } = require("../controllers/adminControllers");


router.post("/signup", signup);
router.post("/login", login);
router.get("/signup",getSignup)
router.get("/login",getLogin)
=======
const { signup, login } = require("../controllers/adminControllers");

router.post("/signup", signup);
router.post("/login", login);
>>>>>>> a2f4893c1a4e905cc3f7a04042fabc672004d9bd

module.exports = router;
