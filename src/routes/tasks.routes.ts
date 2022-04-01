import { Router } from 'express';
import { TaskController } from '../controllers/tasks.controller';
const router = Router();

/**
 * @swagger
 * tags:
 *  name: Tasks
 *  description: Tasks
 */
/**
 * @swagger
 * components:
 *  schemas:
 *    Task:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *          description: the auto-generated id of task
 *        name:
 *          type: string
 *          description: the name of the task
 *        description:
 *          type: string
 *          description: the description of the task
 *      required:
 *        - name
 *        - description
 *      example:
 *        id: gQBOyGbxcQy6tEp0aZ78X
 *        name: My first Task
 *        description: I have to do Something
 *    TaskNotFound:
 *      type: object
 *      properties:
 *        msg:
 *          type: string
 *          description: A message for the not found task
 *      example:
 *        msg: Task was not found
 *
 *  parameters:
 *    taskId:
 *      in: path
 *      name: id
 *      required: true
 *      schema:
 *        type: string
 *      description: the task id
 */
/**
 * @swagger
 * /tasks:
 *  get:
 *    tags: [Tasks]
 *    summary: Return a Task list
 *    responses:
 *      200:
 *        description: The list of tasks
 *        content:
 *          application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Task'
 */
router.get('/tasks', TaskController.getTasks);
/**
 * @swagger
 * /task/count:
 *  get:
 *    tags: [Tasks]
 *    summary: Get local task count
 *    responses:
 *      200:
 *        description: The total number of tasks
 *        content:
 *          text/plain:
 *            schema:
 *              type: integer
 *              example: 14
 */
router.get('/tasks/count', TaskController.count);
/**
 * @swagger
 * /tasks:
 *  post:
 *    tags: [Tasks]
 *    summary: Create a new task
 *    requestBody:
 *      required: true
 *      content: 
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Task'
 *    responses:
 *      200:
 *        description: The task succesfully created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Task'
 *      500:
 *        description: Some server error
 */
router.post('/tasks/', TaskController.createTasks);
/**
 * @swagger
 * /tasks/{id}:
 *  get:
 *    tags: [Tasks]
 *    summary: Get a tasks by id
 *    parameters:
 *      - $ref: '#/components/parameters/taskId'
 *    responses:
 *      200:
 *        description: The task was found
 *        content:
 *          application/json:
 *            $ref: '#/components/schemas/Task'
 *      404:
 *        description: The task was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/TaskNotFound'
 */
router.get('/tasks/:id', TaskController.getTask);
/**
 * @swagger
 * /tasks/{id}:
 *  delete:
 *    summary: delete a task by id
 *    tags: [Tasks]
 *    parameters:
 *      - $ref: '#/components/parameters/taskId'
 *    responses:
 *      200:
 *        description: the task was deleted
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/Task'
 *      404:
 *        description: the task was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/TaskNotFound'
 *
 */
router.delete('/tasks/:id', TaskController.deleteTask);
/**
 * @swagger
 * /tasks/{id}:
 *  put:
 *    summary: Update a task by id
 *    tags: [Tasks]
 *    parameters:
 *      - $ref: '#/components/parameters/taskId'
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Task'
 *    responses:
 *      200:
 *        description: The updated task 
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/Task'
 *      404:
 *        description: the task was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/TaskNotFound'
 *
 */
router.put('/tasks/:id', TaskController.updateTask);

export default router;
