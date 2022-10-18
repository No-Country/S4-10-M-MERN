import mongoose from "mongoose";

export default class Global {
    constructor(collection) {
        this.collection = collection;
        this.model = mongoose.model(this.collection);
    }
    async findById(id) {
        try {
            const item = await this.model.findById(id);
            if (!item) throw new Error('The element hasn\'t been found')
            return item
        } catch (err) {
            console.log(err);
        }

    };
    async findAll() {
        try {
            const allItems = await this.model.find()
            return allItems

        } catch (err) {
            console.log(err);
        }
    }

    async updateById(id, updateProps) {
        const updatedItem = await this.model.findByIdAndUpdate(id, updateProps, { new: true })
        return updatedItem
    }

    async deleteById(id) {
        const item = await this.model.findByIdAndDelete(id)
        if (!item) throw new Error('The element hasn\'t been found')
        return item
    };
}




