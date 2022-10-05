import express from 'express'
import { createmovie } from '../controllers/movies.controller'
import movieFilesHandler from '../middlewares/movieFilesHandler'
const movieRouter = express.Router()



movieRouter.post('/', movieFilesHandler, createmovie)



export default movieRouter