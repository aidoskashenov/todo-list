import { Router } from 'express';

import {
  addTodo, getTodos, deleteTodo, toggleCompletion,
} from 'db';

import sendTodosEmail from 'emails';

const router = new Router();

router.get('/:uid', async ({ params }, res) => {
  try {
    const mongoRes = await getTodos(params);
    if (!mongoRes) {
      throw new Error('User not found!');
    }
    res.status(200);
    res.json(mongoRes);
  } catch (err) {
    res.status(500);
    res.json(err);
  }
});

router.post('/email', async ({ body: { email, incompletes } }, res) => {
  try {
    const emailRes = await sendTodosEmail(email, incompletes);
    res.status(202);
    res.json(emailRes);
  } catch (error) {
    res.status(500);
    console.error(error);
  }
});

router.post('/', async ({ body }, res) => {
  try {
    const mongoRes = await addTodo(body);
    res.status(201);
    res.send(mongoRes);
  } catch {
    res.status(500);
  }
});

router.patch('/', async ({ body: { payload, id } }, res) => {
  try {
    const mongoRes = await toggleCompletion(payload, id);
    res.status(204);
    res.json(mongoRes);
  } catch (err) {
    res.status(500);
  }
});

router.delete('/', async ({ body: { id } }, res) => {
  try {
    const mongoRes = await deleteTodo(id);
    res.status(204);
    res.json(mongoRes);
  } catch (err) {
    res.status(500);
    console.error(err);
  }
});

export default router;
