const Blog = require("../models/Blogs");
const Rating = require("../models/Ratings");
const asyncErrorHandler = require("../utils/asyncErrorHandler");

const getBlogsByAuthor = asyncErrorHandler(async (req, res) => {
  let author = req.user._id;
  let blogs = await Blog.find({ author: author }).populate("author");
  return res.render("blogs", { blogs });
});

const postBlog = asyncErrorHandler(async (req, res) => {
  let user = req.user;
  console.log(req.file);
  console.log(req.body);
  const newBlog = await Blog.create({
    title: req.body.title,
    snippet: req.body.snippet,
    description: req.body.description,
    image: req.file,
    author: user._id,
  });
  res.status(201).json({
    status: "success",
    data: {
      newBlog,
    },
  });
});


const getBlogs = asyncErrorHandler(async (req, res) => {
  let search = req.query.search || "";
  let page = req.query.page * 1 || 1;
  let limit = req.query.limit * 1 || 10 ;
  // let author = req.query.author || "";
  let skip = (page - 1) * limit;
  let sort = req.query.sort || "rating";
  //ratings,year  //ratings year
  sort && sort.split(",").join(" ");
  const blogs = await Blog.find({ title: { $regex: search, $options: "i" } })
    .populate("author")
    // .where("author")
    // .in([author])
    .skip(skip)
    .limit(limit)
    .sort(sort);
  let totalBlogs = await Blog.countDocuments();
  // res.status(200).json({
  //   status: "success",
  //   page,
  //   limit,
  //   totalBlogs,
  //   data: {
  //     blogs,
  //   },
  // });
    res.render("blogs", {
    page,
    limit,
    totalBlogs,
    blogs,
  });
});

const getBlog = asyncErrorHandler(async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findById(id).populate("author");
  const ratings = await Rating.find({ blog: blog._id }).populate("user");
  res.render("blog", { blog, ratings });
});

const updateBlog = asyncErrorHandler(async (req, res) => {
  const { title, description, snippet, image, ratings } = req.body;
  if (req.user.role === "author") {
    const updatedBlog = await Blog.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          title: title,
          snippet: snippet,
          description: description,
          image: image,
        },
      },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      status: "success",
      data: {
        updatedBlog,
      },
    });
  }
  if (req.user.role === "user") {
    const updatedBlog = await Blog.findOneAndUpdate(
      { _id: id },
      {
        $set: { ratings: ratings },
      },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      status: "success",
      data: {
        updatedBlog,
      },
    });
  }
});

const deleteBlog = asyncErrorHandler(async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: "success",
    data: null,
  });
});

const getByAuthor = asyncErrorHandler(async (req, res) => {
  let user = req.user;
  const blogs = await Blog.find({ author: user._id });
  res.status(201).json({
    status: "success",
    data: {
      blogs,
    },
  });
});


let postRating = asyncErrorHandler(async (req, res) => {
  let user = req.user._id;
  let blog = req.params.id;
  let duplicateRating=await Rating.findOne({user:user,blog:blog})
  if(duplicateRating){
    duplicateRating.ratings=req.body.ratings
    await duplicateRating.save()
    return res.redirect("/app/v1/blogs/ratings/:id");
  }
  await Rating.create({
    ratings: +req.body.ratings,
    user: user,
    blog: blog,
  });
  res.redirect("/app/v1/blogs/ratings/:id");
});


// let getRatings = asyncErrorHandler(async (req, res) => {
//   let blogId = req.params.id;
//   let ratings = await Rating.find({ blogId: blogId });
//   res.status(200).json({
//     status: "success",
//     blogId,
//     data: {
//       ratings,
//     },
//   });
// });

const dashboard = (req, res) => {
  if (req.user.role === "admin") {
    return res.render("adminDashBoard");
  }
  if (req.user.role === "user") {
    return res.render("userDashBoard");
  }
  if (req.user.role === "author") {
    return res.render("authorDashBoard");
  }
};

module.exports = {
  postBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
  getByAuthor,
  postRating,
  dashboard,
  getBlogsByAuthor
};
