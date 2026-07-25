import express from 'express';
import { taskRoutes } from './routes/task.routes';
import { healthRoutes } from './routes/health.routes';

const app = express();

app.use(express.json());
app.use(healthRoutes);
app.use(taskRoutes);

export { app };