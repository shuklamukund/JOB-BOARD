import mongoose from 'mongoose';
const { ObjectId,Types } = mongoose.Schema;
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import jobsHistory from './jobHistory.js'
const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        trim:true,
        required:[true,'First Name is required'],
        maxlength:12,

    },
    lastName:{
        type:String,
        trim:true,
        required:[true,'Last Name is required'],
        maxlength:12,

    },
    email:{
        type:String,
        trim:true,
        required:[true,'Email is required'],
        unique:true,
        //match:[' ^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$'],
        
    },
    password:{
        type:String,
        trim:true,
        required:[true,'Password is required'],
        minlength:[6,'Weak password'],
        select:false,

    },

    jobsHistory:[{
        type:Types.ObjectId,
        ref:'jobsHistory',
    }],
    role:{
        type:Number,
        default:0
    }
},{timestamps:true})


//password encryption
userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next();
    }
    this.password=await bcrypt.hash(this.password,10)
})

// compare user password
userSchema.methods={
    comparePassword: async function (enteredPassword) {
        return await bcrypt.compare(enteredPassword, this.password)
    },
    
    // return a JWT token
    getJwtToken: function () {
        return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
            expiresIn: 3600
        });
    }
}

export default mongoose.model("User",userSchema);