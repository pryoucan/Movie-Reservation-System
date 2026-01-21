import mongoose, { Schema } from "mongoose";

const theatreSchema = new Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    city: {
        type: String,
        required: true,
        trim: true
    },
    pincode: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
        trim: true
    }
});

theatreSchema.index({
    name: "text",
    city: "text",
    address: "text"
});

theatreSchema.index({ pincode: 1 });

export const Theatre = mongoose.model("Theatre", theatreSchema);