import express from "express";
import cors from "cors";
import helmet from "helmet";

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(helmet());
