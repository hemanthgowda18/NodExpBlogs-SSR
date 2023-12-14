const express = require("express");
const authRouter = require("./routes/userRoutes");
const flash = require("connect-flash");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
const adminRouter = require("./routes/adminRoutes");
const authorRouter = require("./routes/authorRoutes");
const blogRouter = require("./routes/blogRoutes");
const CustomError = require("./utils/CustomError");
const globalErrorControllers = require("./controllers/globalErrorControllers");
const app = express();
//register template engine
app.set("view engine", "ejs");
app.use(
  cookieSession({
    name: "session",
    keys: ["your-secret-key"],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);
app.use(flash());
app.use((req, res, next) => {
  res.locals.success = req.flash("success")[0];
  res.locals.error = req.flash("error")[0];
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(cookieParser());
app.get("/app/v1/welcome", (req, res) => {
  res.render("welcome");
});

app.use("/app/v1/user", authRouter);
app.use("/app/v1/admin", adminRouter);
app.use("/app/v1/author", authorRouter);
app.use("/app/v1/blogs", blogRouter);

app.all("*", (req, res, next) => {
  let err = new CustomError(404, "page not found");
  next(err);
});

// app.get("/set-cookie", (req, res) => {
//   res.cookie("name", "hemanth", {
//     maxAge: 60 * 1000,
//     httpOnly: true,
//   });
//   res.end("cookie set");
// });
// app.get("/get-cookie",(req,res)=>{
//   res.send(req.cookies.name)
// })
// app.get("/delete-cookie",(req,res)=>{
//   // res.clearCookie("name")
//   // console.log("cookie cleraed");
//   res.cookie("name","",{
//     maxAge:1
//   })
//   res.end("cookie Deleted")
// })

//global error handlers
app.use(globalErrorControllers);
module.exports = app;
