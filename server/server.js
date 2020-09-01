import express from 'express';

import cors from 'cors';

import dotenv from 'dotenv';

import users from './routes/users';

dotenv.config();

const app = express();

app.get('/', (_, res) => {
  res.send('<h1>Hello from Express</h1>');
});

app.use('/users', users);

app.listen(process.env.PORT, () => {
  console.log('Server 🏃🏽‍♂️');
});
