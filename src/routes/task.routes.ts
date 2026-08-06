import { Router } from 'express';
import { TaskController } from '../controllers/task.controller';
import { validateTaskIdMiddleware } from '../middlewares/validate-task-id.middleware';

const taskRoutes = Router();
const taskController = new TaskController();

/**
 * @swagger
 * /tasks:
 *   post:
 *     tags:
 *       - Tasks
 *     summary: Cria uma nova tarefa.
 *     description: Cria uma nova tarefa com os dados fornecidos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTask'
 *     responses:
 *       201:
 *         description: Tarefa criada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Dados inválidos para criação da tarefa.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
taskRoutes.post('/tasks', taskController.create);

/**
 * @swagger
 * /tasks:
 *   get:
 *     tags:
 *       - Tasks
 *     summary: Lista todas as tarefas.
 *     description: Retorna todas as tarefas cadastradas. É possível filtrar por status e prioridade.
 *     parameters:
 *       - $ref: '#/components/parameters/StatusFilter'
 *       - $ref: '#/components/parameters/PriorityFilter'
 *     responses:
 *       200:
 *         description: Lista de tarefas retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       400:
 *         description: Parâmetros de filtro inválidos.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
taskRoutes.get('/tasks', taskController.list);

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     tags:
 *       - Tasks
 *     summary: Retorna uma tarefa existente.
 *     description: Retorna uma tarefa existente com o ID fornecido.
 *     parameters:
 *       - $ref: '#/components/parameters/TaskId'
 *     responses:
 *       200:
 *         description: Tarefa retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: ID da tarefa inválido.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Tarefa não encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
taskRoutes.get('/tasks/:id', validateTaskIdMiddleware, taskController.findById);

/**
 * @swagger
 * /tasks/{id}:
 *   patch:
 *     tags:
 *       - Tasks
 *     summary: Atualiza uma tarefa existente.
 *     description: Atualiza os dados de uma tarefa existente com os dados fornecidos.
 *     parameters:
 *       - $ref: '#/components/parameters/TaskId'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateTask'
 *     responses:
 *       200:
 *         description: Tarefa atualizada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Dados inválidos para atualização da tarefa.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Tarefa não encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
taskRoutes.patch('/tasks/:id', validateTaskIdMiddleware, taskController.update);

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     tags:
 *       - Tasks
 *     summary: Exclui uma tarefa existente.
 *     description: Exclui uma tarefa existente com o ID fornecido.
 *     parameters:
 *       - $ref: '#/components/parameters/TaskId'
 *     responses:
 *       200:
 *         description: Tarefa excluída com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Task deleted successfully.
 *       400:
 *         description: ID da tarefa inválido.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Tarefa não encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
taskRoutes.delete('/tasks/:id', validateTaskIdMiddleware, taskController.delete);

export { taskRoutes };
