import { Router } from 'express';

import { findTodosByUser } from '../db';

const router = new Router();

router.post('/', async ({ body }, res) => {
  try {
    console.log('route got', body);
    const mongoRes = await findTodosByUser(body);
    res.status(201);
    res.send(mongoRes);
  } catch (err) {
    res.status(500);
    res.json(err);
  }
});

export default router;
