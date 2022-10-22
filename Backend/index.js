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
//import { socketIoServer } from "./src/socket.io/server.js";
import { Server } from "socket.io";
import {WordleModel} from "./src/models/wordleModel.js";
import { createServer } from "http";

app.use(cors())
app.use(helmet());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(bodyParser.json());

app.use('/api/v1/user', userRouter)
app.use('/api/v1/movie', movieRouter)
app.use('/api/v1/character', characterRouter)
app.use('/api/v1/word', wordleRouter)

const httpServer = createServer(app);
let player1
let player2
let word

const io = new Server(httpServer, {
    cors: {
        origin: "*",
    }
})


io.on('connection', (socket) => {

    socket.on("prepareGame", (datos, callback) => {
        player1 = datos.transmitter;
        player2 = datos.opponent;
          callback({
            status: "ok"
          });
          socket.to(player2).emit("acceptGame", player1)
    });
    socket.on("gameAccepted", async (callback) => {
        callback({
            player: player1,
            opponent: player2,
        });
        try {
            const numOfWords = await WordleModel.countDocuments()
            word = await WordleModel.findOne().skip(Math.floor(Math.random() * numOfWords))
        } catch (err) {
            word = "ERROR"
        }
        socket.to(player1).emit("startGame", player2)
        socket.to(player2).emit("startGame", player1)
    });

    socket.on("giveMeAWord", (callback) => {
        callback({
            word: word.word
        })
    })

    socket.on("newPlay", (contrincante, data, callback) => {
        callback({
            status: "transmitted"
        });
        socket.to(player1).emit("newPlay", data)
        socket.to(player2).emit("newPlay", data)
    });

    socket.on("gameEnded", (callback) => {
        callback({
            status: "have a winner"
        });
        socket.to(player1).emit("gameEnded")
        socket.to(player2).emit("gameEnded")
    });
})


const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, (err) => {
    !err ? console.log("server on PORT", PORT) : console.log(err);
})