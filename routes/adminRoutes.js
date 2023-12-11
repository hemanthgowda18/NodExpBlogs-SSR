const router = require("express").Router();
const {
  signup,
  login,
  getSignup,
  getLogin,
} = require("../controllers/adminControllers");

router.post("/signup", signup);
router.post("/login", login);
router.get("/signup", getSignup);
router.get("/login", getLogin);
router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
