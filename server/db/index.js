import { ObjectID } from 'mongodb';

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

export const getTodos = async (user) => {
  try {
    return await client.db('todos').collection('todos').find(user).toArray();
  } catch (err) {
    throw new Error(err);
  }
};

export const toggleCompletion = async (completionStatus, id) => {
  try {
    return await client
      .db('todos')
      .collection('todos')
      .updateOne({ _id: ObjectID(id) }, { $set: { completed: completionStatus } });
  } catch (err) {
    throw new Error(err);
  }
};

export const deleteTodo = async (id) => {
  try {
    return await client
      .db('todos')
      .collection('todos')
      .deleteOne({ _id: ObjectID(id) });
  } catch (err) {
    throw new Error(err);
  }
};
