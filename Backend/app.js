import express from "express";
import cors from "cors";
import helmet from "helmet";
import { } from "dotenv";
import userRouter from "./src/routes/user.routes";
import { corsPermissions } from "./src/middlewares/corsConfig";

const PORT = 8080 || 5000;

const app = express();


const cors = cors({corsPermissions})

app.use(helmet());

app.use('/api/v1/user', cors(), userRouter)

app.listen(PORT, (err) => {
    !err ? console.log("server on PORT", PORT) : console.log(err);
})
