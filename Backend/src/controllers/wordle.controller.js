import { WordleModel } from '../models/wordleModel.js'

export const createWord = async (req, res) => {
    try {

        const newWord = new WordleModel(req.body)
        await newWord.save()
        res.status(200).send(newWord)

    } catch (err) {
        res.status(500).send(err.message)
    }
}

export const getRandomWordle = async (req, res) => {
    try {
        const numOfWords = await WordleModel.countDocuments()
        const word = await WordleModel.findOne().skip(Math.floor(Math.random() * numOfWords))
        res.status(200).send(word)

    } catch (err) {
        res.status(500).send(err.message)
    }
}

export const editWord = async (req, res) => {
    try {
        const newWord = new WordleModel(req.body)
        const word = await WordleModel.findByIdAndUpdate(req.params.id, newWord, { new: true })
        res.status(200).send(word)

    } catch (err) {
        res.status(500).send(err.message)
    }
}

export const deleteWord = async (req, res) => {
    try {
        const word = await WordleModel.findByIdAndDelete(req.params.id)
        res.status(200).send(word)

    } catch (err) {
        res.status(500).send(err.message)
    }
}

