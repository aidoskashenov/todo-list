import { Router } from 'express';

import {
  addUser, deleteUser, getUser, getUsers,
} from 'db';

const router = new Router();

router.get('/', async (_, res) => {
  try {
    const mongoRes = await getUsers();
    if (!mongoRes) {
      throw new Error('Unable to get users! 😞');
    }
    res.status(200);
    res.json({ body: mongoRes });
  } catch (err) {
    res.status(500);
    console.error(err);
  }
});

router.get('/:uid', async ({ params }, res) => {
  try {
    const mongoRes = await getUser(params);
    if (!mongoRes) {
      throw new Error('User not found!');
    }
    res.status(200);
    res.json({ body: mongoRes });
  } catch (err) {
    res.status(500);
    console.error(err);
  }
});

router.post('/', async ({ body }, res) => {
  try {
    const mongoRes = await addUser(body);
    res.status(201);
    res.json({ uid: body.uid, mongoRes });
  } catch (err) {
    res.status(500);
    console.error(err);
  }
});

router.delete('/', async ({ body: { id } }, res) => {
  try {
    const mongoRes = await deleteUser(id);
    res.status(204);
    res.json(mongoRes);
  } catch (err) {
    res.status(500);
    console.error(err);
  }
});

export default router;
