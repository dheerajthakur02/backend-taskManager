import express from "express";
import dotenv from "dotenv"
import connectDB from "./db.js"
import taskRoute from "./routes/taskRoute.js"
import userRoute from "./routes/userRoute.js"
import cookieParser from "cookie-parser";
dotenv.config();

const app= express();
app.use(express.json());
app.use(cookieParser());
connectDB();

app.use("/api",taskRoute);
app.use("/api",userRoute);

const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log(`Server is running on the port ${PORT}`)
})