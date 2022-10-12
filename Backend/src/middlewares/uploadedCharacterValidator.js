import { validateCharacter } from "../models/characterModel.js"

export const uploadedCharacterValidator = async (req, res, next) => {

    const characterData = {
        ...req.body,
        img: req.file ? req.file : null
    }
    const { error } = validateCharacter(characterData)

    if (error) return res.status(400).send(error.details)
    next()
}