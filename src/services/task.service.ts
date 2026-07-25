import { Task, TaskStatus, CreateTaskDTO, UpdateTaskDTO } from '../models/task.model';
import { tasks } from '../data/tasks.data';

export class TaskService {
  create({ title, description, priority }: CreateTaskDTO): Task {
    const newTask: Task = {
      id: tasks.length + 1,
      title,
      description,
      status: TaskStatus.PENDING,
      priority,
      createdAt: new Date(),
    };

    tasks.push(newTask);
    return newTask;
  }

  list(): Task[] {
    return tasks;
  }

  findById(taskId: number): Task | undefined {
    return tasks.find(task => task.id === taskId);
  }

  findByStatus(status: TaskStatus): Task[] {
    return tasks.filter(task => task.status === status);
  }

  update(taskId: number, dataUpdate: UpdateTaskDTO): Task | undefined {
    const task = this.findById(taskId);
    if (!task) {
      return undefined;
    }

    if (dataUpdate.title !== undefined) task.title = dataUpdate.title;
    if (dataUpdate.description !== undefined) task.description = dataUpdate.description;
    if (dataUpdate.status !== undefined) task.status = dataUpdate.status;
    if (dataUpdate.priority !== undefined) task.priority = dataUpdate.priority;

    return task;
  }

  delete(taskId: number): boolean {
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex === -1) {
      return false;
    }

    tasks.splice(taskIndex, 1);
    return true;
  }
}