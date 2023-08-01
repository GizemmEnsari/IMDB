import { connectToDB } from "./utils/db.mjs";
import express from "express";
import bodyParser from 'body-parser';
import { isLogged } from "./middleware/isLogged.mjs";
import authRoutes from "./routes/authRoutes.mjs";
import movieRoutes from "./routes/movieRoutes.mjs";
import userRoutes from "./routes/userRoutes.mjs";
import mongoose from 'mongoose';
import {Router} from 'express';
import multer from "multer";
//import { GridFsStorage } from "multer-gridfs-storage";
//import { MongoClient } from "mongodb";

import { isAdmin } from "./middleware/isAdmin.mjs";
import path from 'path';
export const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const port = 4000;

var server
async function createServer() {
    try {
        await connectToDB();
        //Routes
        app.use("/auth", authRoutes);
        app.use("/user", userRoutes)
        app.use("/movie", movieRoutes)

        //(Testing if a user is Logged in and is an Admin)
        app.get('/test', isLogged, (req, res) => {
            res.json('test ok')
        })

    } catch (err) {
        console.log(err)
    }
}
createServer();

console.log(`http://localhost:${port}`);


// app.use('/', express.static(__dirname+))
const __dirname = path.dirname(new URL(import.meta.url).pathname);
const parentDirname = path.join(__dirname, '..');
console.log(parentDirname);


//app.use(express.static(path.join(__dirname, '../Client/view')));
const staticPath = path.join(parentDirname,'../Client/view')
app.use(express.static(staticPath));
console.log(staticPath);

// set the view engine to EJS
app.set("view engine", "ejs");

// set the path to the views directory
app.set("views", staticPath);

// app.get('/', (req,res)=>{
//     res.render('index');
// });

app.get("/movie", (req, res) => {
    res.sendFile(path.join(parentDirname, '../Client/movieMethodsClient.html'));
  });



const Storage = multer.diskStorage({
    destination: "uploads",
    filename: (req,file,cb) =>{
        cb(null,file.originalname);
    },
});

const upload = multer({
    storage:Storage
}).single('testImage')


app.post('/upload',(req,res) => {
    upload(req,res,(err)=>{
        if(err){
            console.log(err)
        }
        else{
            const newUser = new User({
                firstName:req.body.firstName,
                lastName:req.body.lastName,
                email:req.body.email,
                password:req.body.password,
                favourite:req.body.favourite,
                walletAmount:req.body.walletAmount,
                image:{
                    data:req.file.filename,
                    contentType:'image/png'
                }
            })
            newUser.save()
            .then(()=> res.send('successfully uploaded'))
            .catch((err)=>console.log(err));
        }
    })
})

export default{app}


