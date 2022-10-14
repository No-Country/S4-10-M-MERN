import express from 'express'
import { createMovie, deleteMovie, randomMovie, updateMovie } from '../controllers/movies.controller.js'
import movieFilesHandler from '../middlewares/movieFilesHandler.js'
import { uploadedMovieValidator } from '../middlewares/uploadedMovieValidator.js'
const movieRouter = express.Router()


movieRouter.post('/', movieFilesHandler, uploadedMovieValidator, createMovie)
movieRouter.get('/', randomMovie)
movieRouter.put('/:id', movieFilesHandler, updateMovie)
movieRouter.delete('/:id', deleteMovie)



export default movieRouter