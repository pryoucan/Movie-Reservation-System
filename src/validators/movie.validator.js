import { z } from "zod";

const nonEmptyTrimmed = (msg) => z.string().trim().min(1, msg);

const createMovieValidator = z.object({
    title: nonEmptyTrimmed("Movie title required"),

    synopsis: 
        z.string().trim()
        .min(10, "Synopsis required")
        .max(2000, "Movie synopsis is too long"),

    cast: 
        z.array(nonEmptyTrimmed("Cast member name required"))
        .min(1, "Cast required"),

    crew: 
        z.array(nonEmptyTrimmed("Crew member name required"))
        .min(1, "Crew required"),

    genre: 
        z.array(nonEmptyTrimmed("Genre required"))
        .min(1, "Genre required"),

    originalLanguage: nonEmptyTrimmed("Language required"),

    duration: 
        z.string().trim().optional(),

    releaseDate:
        z.coerce.date().optional(),

    pgRating: 
        z.string().trim().optional(),

    trailer: 
        z.string().trim().url("Trailer must be a valid URL").optional(),

    coverImage: 
        z.string().trim().url("Cover image must be a valid URL").optional(),

}).strict();


export { createMovieValidator };