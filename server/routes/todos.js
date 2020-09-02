import { Router } from 'express';

import { addTodo, findTodosByUser } from '../db';

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

router.post('/add', async ({ body }, res) => {
  try {
    const mongoRes = await addTodo(body);
    res.status(201);
    res.send(mongoRes);
  } catch {
    res.status(500);
  }
});

export default router;
