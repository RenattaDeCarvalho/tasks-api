import { Router } from 'express';
import { TaskController } from '../controllers/task.controller';

const taskRoutes = Router();
const taskController = new TaskController();

taskRoutes.post('/tasks', taskController.create);
taskRoutes.get('/tasks', taskController.list);
taskRoutes.get('/tasks/status', taskController.findByStatus);
taskRoutes.get('/tasks/:id', taskController.findById);
taskRoutes.patch('/tasks/:id', taskController.update);
taskRoutes.delete('/tasks/:id', taskController.delete);

export { taskRoutes };
