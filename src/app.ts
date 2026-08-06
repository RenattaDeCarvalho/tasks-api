import express from 'express';
import { taskRoutes } from './routes/task.routes';
import { healthRoutes } from './routes/health.routes';
import { loggerMiddleware } from './middlewares/logger.middleware';
import { notFoundMiddleware } from './middlewares/not-found.middleware';
import { errorMiddleware } from './middlewares/error.middleware';

const app = express();

app.use(express.json());
app.use(loggerMiddleware);
app.use(healthRoutes);
app.use(taskRoutes);
app.use(notFoundMiddleware);
app.use(errorMiddleware);

export { app };