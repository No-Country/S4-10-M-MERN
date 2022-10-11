import awsS3 from '../config/aws-s3.js'
import movieClass from '../utils/movieClass.js'
import filesUploadConfig from '../utils/filesUploadConfig.js'
import mongoose from 'mongoose'
import awsFileDeleting from '../utils/awsFileHandle/awsFileDelete.js'
import awsFileGet from '../utils/awsFileHandle/awsFileGet.js'

export const createMovie = async (req, res) => {
    const session = await mongoose.startSession()
    try {
        session.startTransaction()
        const files = filesUploadConfig(req.files)
        for (const file in files) {
            const fileUpload = await awsS3.send(files[file].command)
            if (fileUpload.$metadata.httpStatusCode !== 200) throw new Error(fileUpload)
        }

        const movie = await movieClass.createNewMovie({ ...req.body, img: files.img.fileName, audio: files.audio.fileName })

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
        const movie = await movieClass.findRandom()

        movie.img = await awsFileGet(movie.img)
        movie.audio = await awsFileGet(movie.audio)

        res.status(200).send(movie)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export const updateMovie = async (req, res) => {

    const id = req.params.id
    const newProperties = Object.assign({}, req.body)

    const session = await mongoose.startSession()
    try {
        session.startTransaction()
        const movie = await movieClass.findById(id)
        if (req.files) {
            const files = filesUploadConfig(req.files)
            for (const file in files) {
                await awsFileDeleting(movie[file])
                const fileUpload = await awsS3.send(files[file].command)
                if (fileUpload.$metadata.httpStatusCode !== 200) throw new Error(fileUpload)
                newProperties[file] = files[file].fileName
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
        const deletedMovie = movieClass.deleteById(req.params.id)
        res.satus(200).send(deletedMovie)
    } catch (err) {
        res.status(500).send(err.message)
    }
}