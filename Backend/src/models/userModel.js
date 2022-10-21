import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Joi from "joi";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    verToken: String,
    role: {
        type: String,
        default: "user"
    },
    scores: [{
        game: {
            type: String,
            enum: {
                values: ['wordle', 'hangman'],
                message: '{VALUE} game is not a valid game'
            }
        },
        score: {
            type: Array,
            default: []
        }
    }]
});

userSchema.statics.encryptPassword = async (password) => {
    try {
        return await bcrypt.hash(password, 10);
    } catch (err) {
        console.log(err);
    }
};

userSchema.statics.comparePassword = async (password, passwordToCompare) => {
    return await bcrypt.compare(password, passwordToCompare);
};

export const validateUser = (user) => {
    const schema = Joi.object({
        username: Joi.string().required(),
        fullName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required()
    })
    return schema.validate(user)
}

export const UserModel = mongoose.model('users', userSchema);
