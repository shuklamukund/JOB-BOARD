import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import errorHandler from './middleware/error.js';
const app=express();

dotenv.config();

//Database Connection
mongoose.connect(process.env.MONGODB_URL)
.then(()=>console.log("Database Connected"))
.catch((err)=>console.log(err))

//Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
   cors(
  //{
  //   origin: [process.env.FRONTEND_URL],
  //   credentials: true,
  // }
  )
);
app.use(morgan('dev'));
app.use(cookieParser());

//error Middleware
app.use(errorHandler);

//import Routes
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js'
//
app.use('/api',authRoutes);
app.use('/api',userRoutes);

//Port
const PORT=process.env.PORT||8000;

app.listen(PORT,()=>{
console.log(`app is listening to http://localhost:${PORT}`);
})