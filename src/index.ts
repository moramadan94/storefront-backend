import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import errorMiddleware from './middleware/error.middleware';
import config from './config';
import routes from './routes';

const PORT = config.port || 3000;
// create an instance server
const app: Application = express();
// Middleware to parses incoming requests with JSON payloads and is based on body-parser.
app.use(express.json());
// HTTP request logger middleware
app.use(morgan('common'));
// HTTP security middleware headers
app.use(helmet());
app.use('/api', routes);

app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Welcome',
  });
});

// error handler middleware
app.use(errorMiddleware);

app.use((_: Request, res: Response) => {
  res.status(404).json({
    message: 'you are lost',
  });
});

// start express server
app.listen(PORT, () => {
  console.log(`Server is starting at prot:${PORT}`);
});
export default app;
