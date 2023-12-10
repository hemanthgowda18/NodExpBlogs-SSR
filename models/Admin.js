const { Schema, model } = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const adminSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name Field Cannot be Empty"],
      trim: true,
      default:"admin"
    },
    email: {
      type: String,
      required: [true, "Email Field Cannot be Empty"],
      lowercase: true,
      unique: true,
      validate: [validator.isEmail, "Enter Proper email"],
    },
    password: {
      type: String,
      required: [true, "Password Field Cannot be Empty"],
      minlength: [8, "Password should contain above 8 characters"],
    },
    confirmPassword: {
      type: String,
      required: [true, "Confirm Password Field Cannot be Empty"],
      minlength: [8, "Confirm Password should contain above 8 characters"],
      //custom validation
      validate: {
        validator: function (value) {
          return this.password === value;
        },
        message: "Password doesn't match",
      },
    },
    role: {
      type: String,
      enum: {
        values: ["admin"],
        message: `{VALUE} role is not defined`,
      },
      default: "admin",
    },
  },
  {
    timestamps: true,
  }
);
adminSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
adminSchema.methods.comparePassword = async function (pwd, pwdDB) {
  return await bcrypt.compare(pwd, pwdDB);
};
module.exports = model("admin", adminSchema);
