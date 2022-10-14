import express from 'express'
import { createWord, editWord, getRandomWordle } from '../controllers/wordle.controller.js'
import { wordValidator } from '../middlewares/wordValidator.js'

const wordleRouter = express.Router()

wordleRouter.post('/', wordValidator, createWord)
wordleRouter.get('/', getRandomWordle)
wordleRouter.put('/:id', wordValidator, editWord)
wordleRouter.delete('/:id', editWord)

export default wordleRouter