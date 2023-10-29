const express=require('express');
const mongoose=require('mongoose');
const morgan=require('morgan');
const bodyParser=require('body-parser');
require('dotenv').config();
const cors=require('cors');
const app=express();



//Database Connection
mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useFindAndModify:false
}).then(()=>console.log("Database Connected"))
.catch((err)=>console.log(err))

//Port
const port=process.env.PORT||8000;

app.listen(PORT,()=>{
console.log(`app is listening to http://localhost:${port}`);
})