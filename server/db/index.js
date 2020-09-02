import client from './client';

export const addUser = async (newUser) => {
  try {
    // Pull out the user ✉️
    const { email } = newUser;
    const existingUser = await client
      .db('todos')
      .collection('users')
      .findOne({ email });

    if (!existingUser) {
      return await client.db('todos').collection('users').insertOne(newUser);
    }

    throw new Error('User already exists!');
  } catch (err) {
    // Throw back any other errors
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
