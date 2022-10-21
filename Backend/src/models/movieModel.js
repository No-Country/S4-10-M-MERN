import mongoose from "mongoose";
import Joi from "joi"

const movieSchema = new mongoose.Schema({
    originalTitle: {
        type: String,
        uppercase: true,
        unique: true,
        required: true
    },
    spanishTitle: {
        type: String,
        uppercase: true,
        unique: true,
        required: true
    },
    characters: {
        type: Array,
        default: []
    },
    category: {
        type: String,
        required: true
    },
    isSerie: {
        type: Boolean,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    audio: {
        type: String,
        required: true
    }
}, { versionKey: false })

export const validateMovie = (movie) => {
    const schema = Joi.object({
        originalTitle: Joi.string().required(),
        spanishTitle: Joi.string().required(),
        category: Joi.string().required(),
        isSerie: Joi.string().valid('0', '1').required(),
        img: Joi.object({
            mimetype: Joi.string().regex(/^image/).required().messages({
                "string.pattern.base": `"img" must have an image extension`
            })
        }).unknown().required().messages({ "object.base": `"img" field is required` }),
        audio: Joi.object({
            mimetype: Joi.string().regex(/^audio/).required().messages({
                "string.pattern.base": `"audio" must have an audio extension`
            })
        }).unknown().required().messages({ "object.base": `"audio" field is required` }),
    })
    return schema.validate(movie)
}

export const movieModel = mongoose.model('movies', movieSchema)