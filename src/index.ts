import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import errorMiddleware from './middleware/error.middleware';
import config from './config';
import routes from './routes';
import cors from 'cors';
import { loggerMiddleware } from './middleware/logger';
import { requestNotFound404 } from './middleware//404Request';
import { handleErrors } from './middleware/handleErrors';

const PORT = config.port || 3000;
const app: Application = express();
app.use(express.json());
app.use(helmet());
app.use('/api', routes);

app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Welcome',
  });
});

app.use(errorMiddleware);

// enable cors
const corsOption = {
  optionsSuccessStatus: 200, // for some lagacy browsers
};
app.use(cors(corsOption));
// add json parser
app.use(express.json());
// console log all requests
app.use(loggerMiddleware);
// handle unknown requests
app.use(requestNotFound404);
// handle errors
app.use(handleErrors);

app.listen(PORT, () => {
  console.log(`Server is starting at prot:${PORT}`);
});
export default app;
