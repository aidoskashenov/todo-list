import client from './client';

export const addUser = async (newUser) => {
  try {
    return await client.db('todos').collection('users').insertOne(newUser);
  } catch (err) {
    // Throw back any other errors
    throw new Error(err);
  }
};

export const getUser = async (uid) => {
  try {
    return await client.db('todos').collection('users').findOne(uid);
  } catch (err) {
    throw new Error(err);
  }
};

export const addTodo = async (newTodo) => {
  try {
    return await client.db('todos').collection('todos').insertOne(newTodo);
  } catch (err) {
    throw new Error(err);
  }
};

export const findTodosByUser = async (user) => {
  try {
    return await client.db('todos').collection('todos').find(user).toArray();
  } catch (err) {
    throw new Error(err);
  }
};

export const toggleCompletion = async (todo, completionStatus) => {
  try {
    return await client
      .db('todos')
      .collection('todos')
      .updateOne(todo, { $set: { completed: completionStatus } });
  } catch (err) {
    throw new Error(err);
  }
};

export const deleteTodo = async (todo) => {
  try {
    return await client.db('todos').collection('todos').deleteOne(todo);
  } catch (err) {
    throw new Error(err);
  }
};
