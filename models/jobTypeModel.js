import mongoose  from 'mongoose';
const {Types, ObjectId } = mongoose.Schema;


const jobTypeSchema = new mongoose.Schema({

    jobTypeName: {
        type: String,
        trim: true,
        required: [true, 'job category is required'],
        maxlength: 70,
    },

    user: {
        type: Types.ObjectId,
        ref: "User",
        required: true
    },



}, { timestamps: true })

export default mongoose.model("JobType", jobTypeSchema); 