import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "pls provide a name"],
    minlength: 2,
    maxlength: 20,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "pls provide a email"],

    validate: {
      validator: validator.isEmail,
      message: "provide a valid email",
    },
  },
  password: {
    type: String,
    required: [true, "pls provide a password"],
    minlength: 6,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function () {
    await this.model("Review").deleteMany({ user: this._id });
  }
);

UserSchema.methods.comparePassword = async function (givenPassword) {
  const isMatch = await bcrypt.compare(givenPassword, this.password);
  return isMatch;
};

export default mongoose.model("User", UserSchema);
