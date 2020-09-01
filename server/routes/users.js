import { Router } from 'express';

import { addUser, loginUser } from '../db';

const router = new Router();

router.get('/', (_, res) => {
  res.send('<h1>You have reached users test route!');
});

router.post('/create', async ({ body }, res) => {
  try {
    const mongoRes = await addUser(body);
    res.status(201);
    res.send(mongoRes);
  } catch (err) {
    res.status(500);
    res.json(err);
  }
});

router.post('/login', async ({ body }, res) => {
  try {
    const mongoRes = await loginUser(body);
    console.log(mongoRes, 'mongores');
    res.status(200);
    res.send(mongoRes);
  } catch (err) {
    res.status(500);
    res.json(err);
  }
});

export default router;
