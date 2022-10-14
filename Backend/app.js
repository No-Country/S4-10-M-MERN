import * as dotenv from 'dotenv'
dotenv.config()
import express from "express";
const app = express();
import helmet from "helmet";
import cors from "cors";
import { corsPermissions } from "./src/middlewares/corsConfig.js"
import './src/config/db.js';
import userRouter from './src/routes/user.routes.js'
import movieRouter from './src/routes/movie.routes.js';
import {socketIoServer} from "./src/socket.io/server.js";

app.use(cors({ corsPermissions }))
app.use(helmet());

app.use('/api/v1/user', userRouter)
app.use('/api/v1/movie', movieRouter)

socketIoServer()

const PORT = process.env.PORT || 5000;

app.listen(PORT, (err) => {
    !err ? console.log("server on PORT", PORT) : console.log(err);
})