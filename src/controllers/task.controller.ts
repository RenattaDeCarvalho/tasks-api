import { Request, Response } from "express";
import { TaskService } from '../services/task.service';
import { TaskStatus, TaskPriority, CreateTaskDTO } from "../models/task.model";

export class TaskController {
    private taskService = new TaskService();

    list = (_req: Request, res: Response): Response => {
        try {
            const tasks = this.taskService.list();

            return res.status(200).json(tasks);
        } catch (error) {
            return res.status(500).json({
                message: "Error fetching tasks."
            });
        }
    }

    create = (req: Request, res: Response) => {
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
    }

    findByStatus = (req: Request, res: Response): Response => {
        try {
            const status = String(req.query.status);

            if (!status) {
                return res.status(400).json({
                    message: "Status query parameter is required."
                });
            }
            const isValidStatus = Object.values(TaskStatus).includes( // Precisamos transformar o TaskStatus em um array para poder usar o metodo 'includes()', para isso, usamos Object.values(TaskStatus), que retorna um array contendo todos os valores do enum TaskStatus, ficando assim : ["pending", "in_progress", "completed"];
                status as TaskStatus // Essa linha fala: Considere que status é do tipo TaskStatus.
            );

            if (!isValidStatus) {
                return res.status(400).json({
                    message: "Invalid status."
                });
            }


            const tasks = this.taskService.findByStatus(status as TaskStatus);

            return res.status(200).json(tasks);
        } catch (error) {
            return res.status(500).json({
                message: "Error fetching tasks."
            });
        }
    }

    findById = (req: Request, res: Response): Response => {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({
                    message: "Task ID is required."
                });
            }

            const task = this.taskService.findById(Number(id));

            if (!task) {
                return res.status(404).json({
                    message: "Task not found."
                });
            }
            const tasks = this.taskService.list();

            return res.status(200).json(tasks);
        } catch (error) {
            return res.status(500).json({
                message: "Error fetching tasks."
            });
        }
    }

    update = (req: Request, res: Response): Response => {
        try {
            const { id } = req.params;
            const dataUpdate = req.body;

            if (!id) {
                return res.status(400).json({
                    message: "Task ID is required."
                });
            }

            if (Object.keys(dataUpdate).length === 0) {
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
                Number(id),
                dataUpdate
            );

            if (!updatedTask) {
                return res.status(404).json({
                    message: "Task not found."
                });
            }

            return res.status(200).json(updatedTask);
        } catch {
            return res.status(500).json({
                message: "Error updating task."
            });
        }
    };

    delete = (req: Request, res: Response): Response => {
        try {
            const { id } = req.params;
            const taskId = Number(id);

            if (!id) {
                return res.status(400).json({
                    message: "Task ID is required."
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
            return res.status(500).json({
                message: "Error deleting task."
            });
        }
    }
}