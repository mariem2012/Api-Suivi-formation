import bodyParser from "body-parser";
import express from 'express';
import { routes } from "./routes/index.js";
import i18next from './config/i18next.js';
import i18nextMiddleware from 'i18next-express-middleware'; 

const app = express()
app.use(i18nextMiddleware.handle(i18next));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', routes);

const port = 3000;

app.listen(port, () => {
  console.log(`Listened on ${port}`);
});
