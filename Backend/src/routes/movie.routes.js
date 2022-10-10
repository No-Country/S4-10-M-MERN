import express from 'express'
import { createMovie, deleteMovie, randomMovie, updateMovie } from '../controllers/movies.controller.js'
import movieFilesHandler from '../middlewares/movieFilesHandler.js'
import { uploadedDataValidator } from '../middlewares/uploadedDataValidator.js'
const movieRouter = express.Router()


movieRouter.post('/', movieFilesHandler, uploadedDataValidator, createMovie)
movieRouter.get('/', randomMovie)
movieRouter.put('/:id', movieFilesHandler, updateMovie)
movieRouter.delete('/:id', deleteMovie)



export default movieRouter