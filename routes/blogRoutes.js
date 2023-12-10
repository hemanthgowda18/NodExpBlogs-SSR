const router = require("express").Router();
const {
  postBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
  // getByAuthor,
  postRating,
  getRatings
} = require("../controllers/blogControllers");

const {auth,verifyRole}= require("../middlewares/authMiddleware");

router.post("/", auth,verifyRole(["author","admin"]), postBlog);
router.get("/", auth, getBlogs);
// router.get("/author", auth, getByAuthor);
router.get("/:id", auth, getBlog);
router.patch("/:id", auth,verifyRole(["author"]), updateBlog);
router.post("/ratings/:id",auth,verifyRole(["user"]),postRating)
router.get("/ratings/:id",auth,verifyRole(["author","user","admin"]),getRatings)
router.delete("/:id", auth,verifyRole(["admin","author"]), deleteBlog);

module.exports = router;
