import express from 'express';
import { taskRoutes } from './routes/task.routes';

const app = express();

app.use(express.json());
app.use(taskRoutes);

export { app };