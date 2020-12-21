import express, { Application, NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import routes from './routes';
import logger, { stream } from './config/logger';

dotenv.config();

const app: Application = express();

// middleware
if (process.env.NODE_ENV === 'production') {
  app.use(morgan(':method :url :remote-addr :user-agent', { stream: stream }));
  app.use(helmet());
} else {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// health chk
app.get('/', (req, res) => {
  res.send('OK');
});

// router
app.use('/api', routes);

// error
app.use((req: Request, res: Response) => {
  res.status(404).json('ERR_NOT_FOUND');
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(err);
  res.status(500).json({
    message: err.message || 'ERR_UNKNOWN_ERROR'
  });
});

// server
const options = {
  host: process.env.NODE_HOST || 'localhost',
  port: process.env.NODE_PORT || 4000
};

app.listen(options, () => console.log(`server on!!! ${options.host}:${options.port}`));
