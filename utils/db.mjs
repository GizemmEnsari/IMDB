import mongoose from 'mongoose';
import { app } from '../index.mjs';
const uri = "mongodb://127.0.0.1:27017/imdb";
import User from '../model/User.mjs';
const port = 4000
var db;

/**
 * A function to stablish a connection with a MongoDB instance.
 */
export async function connectToDB() {

    mongoose.set("strictQuery", false);
    
    mongoose
        .connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            app.listen(port, () => console.log(`Server Port: ${port}`));
        })
        .catch((error) => console.log(`${error} did not connect`));
}



//testing if the User schema works, and logging the info out to the console

export default {connectToDB}