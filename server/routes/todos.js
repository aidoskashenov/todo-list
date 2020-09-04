import { Router } from 'express';

import {
  addTodo, findTodosByUser, deleteTodo, toggleCompletion,
} from '../db';

const router = new Router();

router.post('/', async ({ body }, res) => {
  try {
    const mongoRes = await findTodosByUser(body);
    res.status(200);
    res.send(mongoRes);
  } catch (err) {
    res.status(500);
    res.json(err);
  }
});

router.post('/create', async ({ body }, res) => {
  try {
    const mongoRes = await addTodo(body);
    res.status(201);
    res.send(mongoRes);
  } catch {
    res.status(500);
  }
});

router.patch('/', async ({ body }, res) => {
  try {
    const mongoRes = await toggleCompletion(body.todo, body.completion);
    res.status(204);
    res.send(mongoRes);
  } catch (err) {
    res.status(500);
  }
});

router.delete('/', async ({ body }, res) => {
  try {
    const mongoRes = await deleteTodo(body);
    res.status(204);
    res.send(mongoRes);
  } catch (err) {
    res.status(500);
  }
});

export default router;
