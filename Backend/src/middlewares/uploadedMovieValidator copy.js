import { validateMovie } from "../models/movieModel.js"

export const uploadedMovieValidator = async (req, res, next) => {

    const movieData = {
        ...req.body,
        img: req.files?.img ? req.files?.img[0] : null,
        audio: req.files?.audio ? req.files?.audio[0] : null
    }
    const { error } = validateMovie(movieData)

    if (error) return res.status(400).send(error.details)
    next()
}