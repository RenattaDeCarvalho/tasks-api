import { Router } from 'express';
import { TaskController } from '../controllers/task.controller';
import { validateTaskIdMiddleware } from '../middlewares/validate-task-id.middleware';

const taskRoutes = Router();
const taskController = new TaskController();

taskRoutes.post('/tasks', taskController.create);
taskRoutes.get('/tasks', taskController.list);
taskRoutes.get('/tasks/:id', validateTaskIdMiddleware, taskController.findById);
taskRoutes.patch('/tasks/:id', validateTaskIdMiddleware, taskController.update);
taskRoutes.delete('/tasks/:id', validateTaskIdMiddleware, taskController.delete);

export { taskRoutes };
