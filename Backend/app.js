import express from "express";
import cors from "cors";
import helmet from "helmet";
import { } from "dotenv";

const PORT = 8080 || 5000;

const app = express();

const urlsAllowed = ['aqui van las url que hacen peticion desde el front', 'ejemplo', 'http://localhost:4000']
const methodsRequired = ['GET', 'POST'] // por el momento necesitamos estos dos

app.get('/rutaEjemplo', cors({ credentials: true, methods: methodsRequired[0], origin: urlsAllowed }), (req, res) => {
    res.send('limitaciones con cors')
})

app.use(helmet());

app.listen(PORT, (err) => {
    !err ? console.log("server on PORT", PORT) : console.log(err);
})
