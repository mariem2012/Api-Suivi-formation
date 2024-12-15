import bodyParser from "body-parser";
import express from 'express';
import { routes } from "./routes/index.js";
import cors from 'cors'
import i18next from './config/i18next.js';
import i18nextMiddleware from 'i18next-express-middleware'; 

const app = express()
app.use(i18nextMiddleware.handle(i18next));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  allowedHeaders: ['Authorization', 'Content-type', 'X-Requested-With'],
};
app.use(cors(corsOptions));
app.use('/api', routes);

const port = 3000;

app.get('/', function (req, res) {
  res.send('Hello world')
})

app.listen(port, () => {
  console.log(`Listened on ${port}`);
});
