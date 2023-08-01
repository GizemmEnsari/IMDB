import mongoose from 'mongoose';
import { app } from '../index.mjs';
import {connectToDB} from './utils/db.mjs';

import User from '../model/User.mjs';
/**
 * A function to establish a connection with a MongoDB instance.
 */
const dbConnection = connectToDB();

/**
 * A function to create and save a new user to the database.
 */
export async function saveNewUser() {
  try {
    await dbConnection; // wait for the connection to be established
    const user = new User({
      firstName: 'Hardworking',
      lastName: 'Ants',
      email: 'hardworkingAnts@example.com',
      password: 'mypassword',
      favourite: ['apple', 'banana', 'orange'],
      walletAmount: 100.0,
      isAdmin: false,
      image:{
        data:Buffer,
        contentType:String
      }
    });
    await user.save();
    console.log('User saved successfully!');
  } catch (error) {
    console.log(error);
  } finally {
    mongoose.disconnect();
  }
}