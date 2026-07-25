import { Request, Response } from "express";
import { TaskService } from '../services/task.service';
import { TaskStatus, TaskPriority, CreateTaskDTO, UpdateTaskDTO } from "../models/task.model";

export class TaskController {
    private taskService = new TaskService();

    list = (_req: Request, res: Response): Response => {
        try {
            const tasks = this.taskService.list();

            return res.status(200).json(tasks);
        } catch {
            return res.status(500).json({
                message: "Error fetching tasks."
            });
        }
    }

    create = (req: Request, res: Response): Response => {
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
        } catch {
            return res.status(500).json({
                message: "Error creating task."
            });
        }
    }

    findByStatus = (req: Request, res: Response): Response => {
        try {
            const { status } = req.query;
            if (!status || typeof status !== "string") {
                return res.status(400).json({
                    message: "Status query parameter is required."
                });
            }

            // Object.values transforma os valores do enum em um array
            // para que possamos verificar o status com includes().
            const isValidStatus = Object.values(TaskStatus).includes(
                status as TaskStatus
            );

            if (!isValidStatus) {
                return res.status(400).json({
                    message: "Invalid status."
                });
            }

            const tasks = this.taskService.findByStatus(status as TaskStatus);

            return res.status(200).json(tasks);
        } catch {
            return res.status(500).json({
                message: "Error fetching tasks."
            });
        }
    }

    findById = (req: Request, res: Response): Response => {
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
        } catch {
            return res.status(500).json({
                message: "Error fetching task."
            });
        }
    }

    update = (req: Request, res: Response): Response => {
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
        } catch {
            return res.status(500).json({
                message: "Error updating task."
            });
        }
    };

    delete = (req: Request, res: Response): Response => {
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
        } catch {
            return res.status(500).json({
                message: "Error deleting task."
            });
        }
    }
}