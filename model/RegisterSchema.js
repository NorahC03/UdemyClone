import mongoose from "mongoose";
const { Schema } = mongoose.Schema;


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    profilePic: {
        type: String,
        default: ""    //Replace with a svg string
    },
    role: {
        type: String,
        default: "Student",
        enum: ["Instructor", "Student", "Admin"]

    },

    //Payment sessions 
    stripe_Account_Id: "",          //Replace with razorpay
    stripe_seller: {},
    stripeSession: {}
}, { timestamps: true }
);

export default mongoose.model("User", userSchema);
