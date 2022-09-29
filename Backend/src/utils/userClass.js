import mongoose from "mongoose";
import userModel from "../models/userModel";


class User {
    constructor(collection) {
        this.collection = collection;
        this.model = mongoose.model(this.collection);
    }

    async findOne(user) {
        try {
            const foundUser = await this.model.findOne({ username: user });

            return foundUser ? foundUser : false;
        } catch (err) {
            console.log(err);
        }

    };

    async createNewUser({ username, fullName, email, password }) {
        try {
            const newUser = new userModel({
                username,
                fullName,
                email,
                password: await userModel.encryptPassword(password)
            });

            const createdUser = await newUser.save();

            return createdUser;

        } catch (err) {
            console.log(err);
        }
    }

    async UpdateById(cat, update, id) {
        try {
            const updatedUser = await this.model.findByIdAndUpdate({ _id: id }, { [cat]: update }, { new: true });
            return updatedUser.length === 0 ? true : false;
        } catch (err) {
            console.log(err);
        }
    };

    async findAll() {
        try {
            const user = await this.model.find();

            if (user.length === 0) return false;

            return user;
        } catch (err) {
            console.log(err);
        }

    };

}

export default new User('Users');