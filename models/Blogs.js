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
    ref: "user",
    required: [true, "Author is Required"],
  },
  image: {
    type: [String],
    default: "",
  },
  // _id: { type: String, required: true },
  
});
module.exports=model("blog",blogSchema)