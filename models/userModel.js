import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const jobsHistorySchema = new mongoose.Schema({

    title: {
        type: String,
        trim: true,
        maxlength: 70,
    },

    description: {
        type: String,
        trim: true
    },
    salary: {
        type: String,
        trim: true,
    },
    location: {
        type: String,
    },
    interviewDate: {
        type: Date,
    },
    applicationStatus: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    },

    user: {
        type: ObjectId,
        ref: "User",
        required: true
    },



}, { timestamps: true })


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
        match:[
            "^[A-Za-z0-9](([a-zA-Z0-9,=\.!\-#|\$%\^&\*\+/\?_`\{\}~]+)*)@(?:[0-9a-zA-Z-]+\.)+[a-zA-Z]{2,9}$"
        ],
        
    },
    password:{
        type:String,
        trim:true,
        required:[true,'Password is required'],
        minlength:[6,'Weak password'],

    },
    role:{
        type:Number,
        default:0
    }
},{timestamps:true})


//password encryption
userSchema.pre('save',async function(next){
    if(!this.isModified){
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