import { db } from './firebase';

export const doCreateUser = (id, username, email, password, account) =>
db.ref(`users/${id}`).set({
  username,
  email,
  password, 
  account,
  
});

export const onceGetUsers = () =>
db.ref('users').once('value');

// Other Entity APIs ...