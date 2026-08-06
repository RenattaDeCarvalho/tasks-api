import { Task, TaskStatus, TaskPriority, CreateTaskDTO, UpdateTaskDTO } from '../models/task.model';
import { tasks } from '../data/tasks.data';

export class TaskService {
  create({ title, description, priority }: CreateTaskDTO): Task {
    // aqui usamos o operador ternário parqa facilitar a verificação
    // se a lista de tarefas está vazia ou não, e assim definir o próximo id
    const nextId =
      tasks.length > 0
        ? Math.max(...tasks.map(task => task.id)) + 1
        : 1;

    const newTask: Task = {
      id: nextId,
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
    // transformamos em timestamp usando o getTime() para poder comparar as datas e ordenar corretamente
    return [...tasks].sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }

  findById(taskId: number): Task | undefined {
    return tasks.find(task => task.id === taskId);
  }

  findByStatus(status: TaskStatus): Task[] {
    return tasks.filter(task => task.status === status).sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());;
  }

  findByPriority(priority: TaskPriority): Task[] {
    return tasks.filter(task => task.priority === priority).sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());;
  }

  update(taskId: number, dataUpdate: UpdateTaskDTO): Task | undefined {
    let hasUpdated = false;
    const task = this.findById(taskId);
    if (!task) {
      return undefined;
    }

    if (dataUpdate.title !== undefined) {
      task.title = dataUpdate.title;
      hasUpdated = true;
    }
    if (dataUpdate.description !== undefined) {
      task.description = dataUpdate.description;
      hasUpdated = true;
    }
    if (dataUpdate.status !== undefined) {
      task.status = dataUpdate.status;
      hasUpdated = true;
    }
    if (dataUpdate.priority !== undefined) {
      task.priority = dataUpdate.priority;
      hasUpdated = true;
    }
    if (dataUpdate.status === TaskStatus.COMPLETED) {
      task.completedAt = new Date();
    } else {
      task.completedAt = undefined;
    }

    if (hasUpdated) {
      task.updatedAt = new Date();
    }

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