import dotenv from 'dotenv'
import {app} from './app.js'
import connectDB from './db/index.js'
import path from 'path'
import express from 'express'
dotenv.config({
    path: "./env"
})


// -------------------code for deployment -------------------------
if (process.env.NODE_ENV === "production") {
    const dirPath = path.resolve();
    app.use(express.static("./Frontend/dist"));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(dirPath, "./Frontend/dist", "index.html"));
    });
  }

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(` Server is running at port : ${process.env.PORT}`);
        
    })
})
.catch((err)=>{
    console.log("MONGO db conneection failed !!!",err); 
    
})