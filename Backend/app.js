import express from "express";
import cors from "cors";
import helmet from "helmet";
import { } from "dotenv";
import userRouter from "./src/routes/user.routes";


const PORT = 8080 || 5000;

const app = express();

const urlsAllowed = ['aqui van las url que hacen peticion desde el front', 'ejemplo', 'http://localhost:4000']
const methodsRequired = ['GET', 'POST'] // por el momento necesitamos estos dos

const cors = cors({ credentials: true, methods: methodsRequired[0], origin: urlsAllowed })

app.use(helmet());

app.use('/api/v1/user', cors, userRouter)

app.listen(PORT, (err) => {
    !err ? console.log("server on PORT", PORT) : console.log(err);
})
