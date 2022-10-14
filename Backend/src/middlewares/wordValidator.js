import { validateWordle } from "../models/wordleModel.js"

export const wordValidator = async (req, res, next) => {

    const { error } = validateWordle(req.body)
    if (error) return res.status(400).send(error.details)

    next()
}