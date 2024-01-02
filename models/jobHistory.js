import mongoose from 'mongoose';
import User from './userModel.js';
import {Types,ObjectId } from 'mongoose';
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
        type:Types. ObjectId,
        ref: "User",
        required: true
    },



}, { timestamps: true })

const jobsHistory= mongoose.model("jobsHistory",jobsHistorySchema);
export default jobsHistory;