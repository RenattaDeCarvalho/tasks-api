import { Request, Response, NextFunction } from "express";
import { TaskService } from '../services/task.service';
import { TaskStatus, TaskPriority, CreateTaskDTO, UpdateTaskDTO } from "../models/task.model";

export class TaskController {
    private taskService = new TaskService();

    list = (req: Request, res: Response, next: NextFunction): Response | void => {
        try {
            // parametros aceitos
            const allowedFilters = ["status", "priority"];

            // Object.keys(req.query) pega apenas as chaves do objeto
            // ex: ["status", "priority"]
            const receivedFilters = Object.keys(req.query);

            // O some() verifica se pelo menos um elemento do array atende a condição
            const hasInvalidFilter = receivedFilters.some(
                //aqui ele nega a condição verificando se os parametro estao invalidos e retorna um booleano
                filter => !allowedFilters.includes(filter)
            );

            if (hasInvalidFilter) {
                return res.status(400).json({
                    message: "Invalid filter parameter."
                });
            }

            const { status, priority } = req.query;

            if (
                status !== undefined &&
                !Object.values(TaskStatus).includes(status as TaskStatus)
            ) {
                return res.status(400).json({
                    message: "Invalid status."
                });
            }

            if (
                priority !== undefined &&
                !Object.values(TaskPriority).includes(priority as TaskPriority)
            ) {
                return res.status(400).json({
                    message: "Invalid priority."
                });
            }

            const tasks = this.taskService.list(
                status as TaskStatus | undefined,
                priority as TaskPriority | undefined
            );

            return res.status(200).json(tasks);

        } catch (error) {
            next(error);
        }
    }

    create = (req: Request, res: Response, next: NextFunction): Response | void=> {
        try {
            const { title, description, priority } = req.body as CreateTaskDTO;

            if (!title || !description || !priority) {
                return res.status(400).json({
                    message: "All fields are required."
                });
            }
            const isValidPriority = Object.values(TaskPriority).includes(
                priority as TaskPriority
            );

            if (!isValidPriority) {
                return res.status(400).json({
                    message: "Invalid priority."
                });
            }

            const newTask = this.taskService.create({
                title,
                description,
                priority: priority as TaskPriority
            });

            return res.status(201).json(newTask);
        } catch (error) {
            next(error);
        }
    }

    findById = (req: Request, res: Response, next: NextFunction): Response | void => {
        try {
            const taskId = Number(req.params.id);
            if (Number.isNaN(taskId)) {
                return res.status(400).json({
                    message: "Task ID must be a valid number."
                });
            }

            const task = this.taskService.findById(taskId);

            if (!task) {
                return res.status(404).json({
                    message: "Task not found."
                });
            }

            return res.status(200).json(task);
        } catch (error) {
            next(error);
        }
    }

    update = (req: Request, res: Response, next: NextFunction): Response | void => {
        try {
            const dataUpdate = req.body as UpdateTaskDTO;

            const taskId = Number(req.params.id);
            if (Number.isNaN(taskId)) {
                return res.status(400).json({
                    message: "Task ID must be a valid number."
                });
            }

            if (!dataUpdate || Object.keys(dataUpdate).length === 0) {
                return res.status(400).json({
                    message: "Update data is required."
                });
            }

            if (
                dataUpdate.status &&
                !Object.values(TaskStatus).includes(dataUpdate.status)
            ) {
                return res.status(400).json({
                    message: "Invalid status."
                });
            }

            if (
                dataUpdate.priority &&
                !Object.values(TaskPriority).includes(dataUpdate.priority)
            ) {
                return res.status(400).json({
                    message: "Invalid priority."
                });
            }

            const updatedTask = this.taskService.update(
                taskId,
                dataUpdate
            );

            if (!updatedTask) {
                return res.status(404).json({
                    message: "Task not found."
                });
            }

            return res.status(200).json(updatedTask);
        } catch (error) {
            next(error);
        }
    };

    delete = (req: Request, res: Response, next: NextFunction): Response | void => {
        try {
            const taskId = Number(req.params.id);

            if (Number.isNaN(taskId)) {
                return res.status(400).json({
                    message: "Task ID must be a valid number."
                });
            }

            const isDeleted = this.taskService.delete(taskId);

            if (!isDeleted) {
                return res.status(404).json({
                    message: "Task not found."
                });
            }

            return res.status(200).json({
                message: "Task deleted successfully."
            });
        } catch (error) {
            next(error);
        }
    }
}