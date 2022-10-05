import express from 'express'
import { createmovie } from '../controllers/movies.controller'
const movieRouter = express.Router()



movieRouter.post('/', createmovie)



export default movieRouter