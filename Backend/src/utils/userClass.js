import mongoose from "mongoose";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import GlobalClass from "./globalClass.js";

class User extends GlobalClass {

    async findByCategory(cat, catName) {
        try {
            const foundUser = await this.model.findOne({ [catName]: cat });
            return foundUser ? foundUser : false;
        } catch (err) {
            console.log(err);
        }

    };

    async createNewUser({ username, fullName, email, password }) {
        try {
            const userExists = await this.model.findOne({ email });

            if (userExists) return false;

            const newUser = new userModel({
                username,
                fullName,
                email,
                password: await userModel.encryptPassword(password)
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
            const updatedUser = await this.model.findByIdAndUpdate({ id }, { [cat]: update }, { new: true });
            return updatedUser.length === 0 ? true : false;
        } catch (err) {
            console.log(err);
        }
    };
}

export default new User('users');