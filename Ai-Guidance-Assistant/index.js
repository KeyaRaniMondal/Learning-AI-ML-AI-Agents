import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

const PORT=process.env.PORT || 3000
const app=express()

app.use(cors()) //acts as a middleware

app.use(express.json()) //to accept json data

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("Mongodb connected ")
    app.listen(PORT,()=>console.log("Server at http://localhost:3000"));
})
.catch((err)=>console.error("MongoDB error: ",err))