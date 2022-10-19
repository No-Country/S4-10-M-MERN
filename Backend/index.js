import * as dotenv from 'dotenv';
dotenv.config();
import express from "express";
const app = express();
import helmet from "helmet";
import cors from "cors";
import './src/config/db.js';
import userRouter from './src/routes/user.routes.js';
import movieRouter from './src/routes/movie.routes.js';
import bodyParser from 'body-parser';
import characterRouter from './src/routes/character.routes.js';
import wordleRouter from './src/routes/wordle.routes.js';
import { socketIoServer } from "./src/socket.io/server.js";

app.use(cors())
app.use(helmet());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(bodyParser.json());

app.use('/api/v1/user', userRouter)
app.use('/api/v1/movie', movieRouter)
app.use('/api/v1/character', characterRouter)
app.use('/api/v1/word', wordleRouter)
socketIoServer()

const PORT = process.env.PORT || 5000;

app.listen(PORT, (err) => {
    !err ? console.log("server on PORT", PORT) : console.log(err);
})