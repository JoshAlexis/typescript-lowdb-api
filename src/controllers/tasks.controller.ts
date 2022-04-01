import { Request, Response } from "express";
import { getConnection } from "../db";
import { nanoid } from 'nanoid';

interface TaskBody {
  name: string;
  description: string;
}

interface TaskParam {
  id: string;
}

interface TaskRequestBody<T> extends Express.Request {
  body: T;
}

interface TaskRequestParamBody<T, U> extends Express.Request {
  body: T;
  params: U;
}

export class TaskController {
  static getTasks(req: Request, res: Response) {
    const tasks = getConnection().get('tasks').value();
    return res.json(tasks);
  }

  static createTasks(req: TaskRequestBody<TaskBody>, res: Response) {
    const { name, description } = req.body;

    const newTask = {
      name,
      description,
      id: nanoid()
    }

    try {
      getConnection().get('tasks').push(newTask).write()
      res.json(newTask);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  static getTask(req: Request, res: Response) {
    const { id } = req.params;

    const taskFound = getConnection().get('tasks').find({ id }).value();

    if (!taskFound) return res.status(404).json({ msg: "Task was not Found" });

    res.json(taskFound);
  }

  static count(req: Request, res: Response) {
    const taskLength = getConnection().get('tasks').value().length;
    res.json(taskLength);
  }

  static deleteTask(req: TaskRequestParamBody<unknown, TaskParam>, res: Response) {
    const { id } = req.params;

    const taskFound = getConnection().get('tasks').find({ id }).value();

    if (!taskFound) return res.status(404).json({ msg: "Task was not Found" });

    const deletedTask = getConnection().get('tasks').remove({ id }).write();
    res.json(deletedTask);
  }

  static updateTask(req: TaskRequestParamBody<TaskBody, TaskParam>, res: Response) {
    const { id } = req.params;
    const { name, description } = req.body;

    const taskFound = getConnection().get('tasks').find({ id }).value();

    if (!taskFound) return res.status(404).json({ msg: "Task was not Found" });

    const updatedTask = getConnection()
    .get('tasks')
    .find({ id })
    .assign({
      name,
      description
    })
    .write();

    res.json(updatedTask);
  }
}