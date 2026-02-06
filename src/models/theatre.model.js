import mongoose, { Schema } from "mongoose";

const theatreSchema = new Schema({
    movies: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Movie"
    },
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
}, { timestamps: true });

theatreSchema.index({
    name: "text",
    city: "text",
    address: "text",
    pincode: "text"
});

export const Theatre = mongoose.model("Theatre", theatreSchema);