require("dotenv").config({ path: "../../.env" });
import userModel from "../models/userModel";
import jwt from "jsonwebtoken";
import GlobalClass from "./globalClass.js";

class User extends GlobalClass {
  async findByEmail(email) {
    const foundUser = await this.model.findOne({ email: email });
    return foundUser ? foundUser : false;
  }

  async findByCategory(cat, catName) {
    try {
      const foundUser = await this.model.findOne({ [catName]: cat });
      return foundUser ? foundUser : false;
    } catch (err) {
      console.log(err);
    }
  }

  async loginUser(email, password) {
    const foundUser = await this.model.findOne({ email });
    // if (!foundUser) return false;

    const comparedPassword = userModel.comparePassword(
      password,
      foundUser.password
    );

    if (comparedPassword) {
      const authToken = jwt.sign(
        [foundUser.username, foundUser.password],
        process.env.SECRET_KEY,
        { expiresIn: "5m" }
      );
      return authToken;
    }
    return false;
  }

  async createNewUser({ username, fullName, email, password }) {
    try {
      const userExists = await this.model.findOne({ email });

      if (userExists) return false;

      const newUser = new userModel({
        username,
        fullName,
        email,
        password: await userModel.encryptPassword(password),
      });

      const verToken = jwt.sign(
        [newUser.username, newUser.password],
        process.env.SECRET_KEY,
        { expiresIn: "10m" }
      );

      newUser.verToken = verToken;

      const createdUser = newUser.save();

      return createdUser;
    } catch (err) {
      console.log(err);
    }
  }

  async UpdateById(cat, update, id) {
    try {
      const updatedUser = await this.model.findByIdAndUpdate(
        id,
        { [cat]: update },
        { new: true }
      );
      return updatedUser.length === 0 ? true : false;
    } catch (err) {
      console.log(err);
    }
  }
  async deleteUserByUsername(username) {
    const userToDelete = await this.model.findOne({ username });

    if (!userToDelete) {
      return false;
    }
    await this.model.deleteOne({ username });

    return true;
  }
}

export default new User("Users");
// module.exports = { Users };
