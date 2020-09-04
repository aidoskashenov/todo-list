import { Router } from 'express';

import { addUser, getUser } from '../db';

const router = new Router();

router.get('/', (_, res) => {
  res.send('<h1>You have reached users test route!</h1>');
});

router.get('/:uid', async ({ params }, res) => {
  try {
    const mongoRes = await getUser(params);
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

router.post('/create', async ({ body }, res) => {
  try {
    const mongoRes = await addUser(body);
    res.status(201);
    res.json(mongoRes);
  } catch (err) {
    res.status(500);
    res.json(err);
  }
});

export default router;
