import { Router } from 'express';

const router = new Router();

router.get('/', (_, res) => {
  res.send('<h1>You have reached users test route!');
});

export default router;
