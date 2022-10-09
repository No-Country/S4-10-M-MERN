import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  verToken: String,
  verifyUser: Boolean,
  score: {
    type: Array,
    default: [],
  },
});

userSchema.statics.encryptPassword = async (password) => {
  try {
    return await bcrypt.hash(password, 10);
  } catch (err) {
    console.log(err);
  }
};

userSchema.statics.comparePassword = async (password, passwordToCompare) => {
  return bcrypt.compare(password, passwordToCompare);
};

export default new mongoose.model("users", userSchema);
