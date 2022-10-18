import movieClass from '../utils/movieClass.js'
import mongoose from 'mongoose'
import awsFileDeleting from '../utils/awsFileHandle/awsFileDelete.js'
import awsFileGet from '../utils/awsFileHandle/awsFileGet.js'
import awsFilePost from '../utils/awsFileHandle/awsFilePost.js'


export const createMovie = async (req, res) => {

    const movieProperties = Object.assign({}, req.body)

    const session = await mongoose.startSession()
    try {
        session.startTransaction()
        for (const fileKey in req.files) {
            movieProperties[fileKey] = await awsFilePost(req.files[fileKey][0])
        }

        const movie = await movieClass.createNewMovie(movieProperties)

        res.status(200).send(movie)
        await session.commitTransaction()
    } catch (err) {
        await session.abortTransaction()
        res.status(500).send(err.message)
    }
    session.endSession()
}

export const randomMovie = async (req, res) => {
    try {
        const movie = await movieClass.findRandom(req.params.game)

        if (movie.img) movie.img = await awsFileGet(movie.img)
        if (movie.audio) movie.audio = await awsFileGet(movie.audio)

        res.status(200).send(movie)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export const updateMovie = async (req, res) => {

    const id = req.params.id
    const movieProperties = Object.assign({}, req.body)

    const session = await mongoose.startSession()
    try {
        session.startTransaction()
        const movie = await movieClass.findById(id)
        if (req.files) {
            for (const fileKey in req.files) {
                await awsFileDeleting(movie[fileKey])
                movieProperties[fileKey] = await awsFilePost(req.files[fileKey][0])
            }
        }

        const newMovie = await movieClass.updateById(id, newProperties)
        res.status(200).send(newMovie)
        await session.commitTransaction()
    } catch (err) {
        await session.abortTransaction()
        res.status(500).send(err.message)
    }
    session.endSession()
}

export const deleteMovie = async (req, res) => {
    try {
        const deletedMovie = await movieClass.deleteById(req.params.id)
        await awsFileDeleting(movie.img)
        res.satus(200).send(deletedMovie)
    } catch (err) {
        res.status(500).send(err.message)
    }
}