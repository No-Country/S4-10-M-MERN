import express from 'express'
import { createmovie } from '../controllers/movies.controller.js'
import movieFilesHandler from '../middlewares/movieFilesHandler.js'
const movieRouter = express.Router()



movieRouter.post('/', movieFilesHandler, createmovie)



export default movieRouter