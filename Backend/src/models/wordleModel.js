import Joi from "joi";
import mongoose from "mongoose";

const wordleSchema = new mongoose.Schema({
    word: {
        type: String,
        uppercase: true,
        unique: true,
        required: true
    }
}, { versionKey: false });

export const validateWordle = (wordle) => {
    const schema = Joi.object({
        word: Joi.string().regex(/^[A-Z]{5}$/).required().messages({
            "string.pattern.base": `The word must have 5 letters without symbols`
        })
    })
    return schema.validate(wordle)
}

export const WordleModel = mongoose.model('wordle', wordleSchema); 
