import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import morgan from "morgan"
import path from "path"
import fileUpload from 'express-fileupload';
// import { errorHandler } from "./middlewares/errorHandler.js"

import connectDB from "./config/db.js"
import router from "./routes/authRoutes.js"

dotenv.config({path: "./config/config.env"});
connectDB().then()

const app = express()

app.use(cors({
    origin: '*',  // React frontend URL
    
    // credentials: true 
     // Enable if you're using cookies/auth tokens
}));
app.use(morgan("dev"))
app.use(express.json({limit: "50mb"}))
app.use(express.urlencoded({extended: "true", limit: "50mb"}))
app.use(fileUpload());
app.use("/api/", router)


const PORT = process.env.PORT || 5000;
app.listen(
    PORT, '0.0.0.0', () =>{

        console.log(`servers runnin in ${process.env.NODE_ENV} mode on port ${PORT}`)
    }
)