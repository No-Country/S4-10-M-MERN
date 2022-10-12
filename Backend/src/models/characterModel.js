import Joi from "joi";
import mongoose from "mongoose";

const characterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    aliases: {
        type: [String],
        default: null
    },
    img: {
        type: String,
        required: true
    },
    movieID: {
        type: mongoose.Types.ObjectId,
        required: true,
    }
}, { versionKey: false });

export const validateCharacter = (character) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        aliases: Joi.array().required(),
        img: Joi.object({
            mimetype: Joi.string().regex(/^image/).required().messages({
                "string.pattern.base": `"img" must have an image extension`
            })
        }).unknown().required().messages({ "object.base": `"img" field is required` }),
        movieID: Joi.string().required()
    })
    return schema.validate(character)
}

export const characterModel = mongoose.model('characters', characterSchema); 
