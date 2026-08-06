import express from 'express';
import swaggerUi from "swagger-ui-express";
import { swaggerDocument } from "./docs/swagger";
import { taskRoutes } from './routes/task.routes';
import { healthRoutes } from './routes/health.routes';
import { loggerMiddleware } from './middlewares/logger.middleware';
import { notFoundMiddleware } from './middlewares/not-found.middleware';
import { errorMiddleware } from './middlewares/error.middleware';

const app = express();

app.use(express.json());
app.use(loggerMiddleware);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(healthRoutes);
app.use(taskRoutes);
app.use(notFoundMiddleware);
app.use(errorMiddleware);

export { app };