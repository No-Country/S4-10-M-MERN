import awsS3 from '../config/aws-s3.js'
import characterClass from '../utils/characterClass.js'
import mongoose from 'mongoose'
import awsFileDeleting from '../utils/awsFileHandle/awsFileDelete.js'
import awsFileGet from '../utils/awsFileHandle/awsFileGet.js'

export const createCharacter = async (req, res) => {

    const characterProperties = Object.assign({}, req.body)

    const session = await mongoose.startSession()
    try {
        session.startTransaction()

        characterProperties.img = await awsFilePost(req.file)
        const character = await characterClass.createNewCharacter(characterProperties)

        res.status(200).send(character)
        await session.commitTransaction()
    } catch (err) {
        await session.abortTransaction()
        res.status(500).send(err.message)
    }
    session.endSession()
}

export const randomCharacter = async (req, res) => {
    try {
        const character = await characterClass.findRandom()

        character.img = await awsFileGet(character.img)

        res.status(200).send(character)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export const updateCharacter = async (req, res) => {

    const id = req.params.id
    const newProperties = Object.assign({}, req.body)

    const session = await mongoose.startSession()
    try {
        session.startTransaction()
        const movie = await characterClass.findById(id)
        if (req.files) {
            const files = filesUploadConfig(req.files)
            for (const file in files) {
                await awsFileDeleting(movie[file])
                const fileUpload = await awsS3.send(files[file].command)
                if (fileUpload.$metadata.httpStatusCode !== 200) throw new Error(fileUpload)
                newProperties[file] = files[file].fileName
            }
        }

        const newMovie = await characterClass.updateById(id, newProperties)
        res.status(200).send(newMovie)
        await session.commitTransaction()
    } catch (err) {
        await session.abortTransaction()
        res.status(500).send(err.message)
    }
    session.endSession()
}

export const deleteCharacter = async (req, res) => {
    try {
        const deletedCharacter = characterClass.deleteById(req.params.id)
        res.satus(200).send(deletedCharacter)
    } catch (err) {
        res.status(500).send(err.message)
    }
}
