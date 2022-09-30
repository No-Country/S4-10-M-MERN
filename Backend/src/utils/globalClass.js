import mongoose from "mongoose";

export default class Global {
    constructor(collection) {
        this.collection = collection;
        this.model = mongoose.model(this.collection);
    }
    async findById(id) {
        try {
            const foundUser = await this.model.findById({ id });
            
            return foundUser ? foundUser : false;
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