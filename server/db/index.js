import client from './client';

export const addUser = async (newUser) => {
  try {
    return await client.db('todos').collection('users').insertOne(newUser);
  } catch (err) {
    throw new Error(err);
  }
};

export const loginUser = async (creds) => {
  try {
    return await client.db('todos').collection('users').find(creds).toArray();
  } catch (err) {
    throw new Error(err);
  }
};
