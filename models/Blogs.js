const {Schema,model, default: mongoose}=require('mongoose')
const blogSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Title is Required"],
  },
  snippet: {
    type: String,
    trim: true,
    required: [true, "Snippet is Required"],
  },
  description: {
    type: String,
    required: [true, "Description is Required"],
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "author",
    required: [true, "Author is Required"],
  },
  image: {
    type: [""],
    default: "",
  },
 price:{
  type:Number,
  default:0,
  max:[200,"price cant exceed 200 rupees"]
 }
  
});
module.exports=model("blog",blogSchema)