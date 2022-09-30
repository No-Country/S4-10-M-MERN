import express from "express";
import cors from "cors";
import helmet from "helmet";
const PORT = 8080 || 5000;

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

app.use(helmet());

app.listen(PORT, (err) => {
    !err ? console.log("server on PORT", PORT) : console.log(err);
})
