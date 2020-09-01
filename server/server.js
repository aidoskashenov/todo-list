import express from 'express';

import cors from 'cors';

import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.get('/', (_, res) => {
  res.send('<h1>Hello from Express</h1>');
});

app.listen(process.env.PORT, () => {
  console.log('Server 🏃🏽‍♂️');
});
