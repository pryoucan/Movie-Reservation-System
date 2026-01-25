import mongoose, { Schema } from "mongoose";

const movieSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    synopsis: {
        type: String,
        required: true
    },
    cast: {
        type: [String],
        required: true
    },
    crew: {
        type: [String],
        required: true
    },
    genre: {
        type: [String],
        required: true
    },
    originalLanguage: {
        type: String,
        required: true
    },
    duration: {
        type: String
    },
    releaseDate: {
        type: Date,
    },
    pgRating: {
        type: String
    },
    trailer: {
        type: String
    },
    coverImage: {
        type: String
    }


}, { timestamps: true });

movieSchema.index({
    title: "text",
    cast: "text",
    genre: "text",
    crew: "text",
    synopsis: "text"
});

export const Movie = mongoose.model("Movie", movieSchema);