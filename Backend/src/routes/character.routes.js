import express from 'express'
import { createCharacter, deleteCharacter, randomCharacter, updateCharacter } from '../controllers/character.controller.js'
import { uploadedCharacterValidator } from '../middlewares/uploadedCharacterValidator.js'
import characterFileHandler from '../middlewares/characterFileHandler.js'
const characterRouter = express.Router()

characterRouter.post('/', characterFileHandler, uploadedCharacterValidator, createCharacter)
characterRouter.get('/:game?', randomCharacter)
characterRouter.put('/:id', characterFileHandler, updateCharacter)
characterRouter.delete('/:id', deleteCharacter)

export default characterRouter