import { validateUser } from "../models/userModel.js"


export const userValidator = async (req, res, next) => {

    const { error } = validateUser(req.body)
    if (error) return res.status(400).send(error.details)

    next()
}