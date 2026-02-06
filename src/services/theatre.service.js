import { Theatre } from "../models/theatre.model.js";
import { Movie } from "../models/movie.model.js";
import { ApiError } from "../utils/error_class.js";

const getTheatreByFilterService = async (q) => {
    let pagination = {};
    let filter = {};
    if (q && q.name) {
        filter.name = q.name;
    }
    if (q && q.pincode) {
        filter.pincode = q.pincode;
    }
    if (q && q.city) {
        filter.city = q.city;
    }
    if (q && q.movies) {
        filter.movies = q.movies;
    }

    if (q && q.limit) {
        pagination.limit = Number(q.limit);
        if (isNaN(pagination.limit)
            || pagination.limit < 10
            || pagination.limit > 50) {
            pagination.limit = 10;
        }
    }
    if (q && q.skip) {
        pagination.skip = Number(q.skip);
        let perPage = (pagination.limit) ? pagination.limit : 10;
        if (isNaN(pagination.skip) || pagination.skip === 0) {
            pagination.skip = 1;
        }
        pagination.skip = perPage * pagination.skip;
    }

    const theatre = await Theatre.find(filter)
        .populate("movies")
        .limit(pagination.limit)
        .skip(pagination.skip)
        .lean();
    if (theatre.length === 0) {
        const error = new Error("Theater not found");
        error.statusCode = 404;
        throw error;
    }
    return theatre;
};


const getTheatreByIdService = async (tId) => {
    const theatre = await Theatre.findById(tId).lean();
    if (!theatre) {
        const error = new Error("Theater not found");
        error.statusCode = 404;
        throw error;
    }
    return theatre;
};


const createTheatreService = async (data) => {
    const theatre = await Theatre.create(data);
    return theatre;
};


const updateTheatreService = async (tId, data) => {
    const theatre = await Theatre.findByIdAndUpdate(tId, data, {
        new: true,
        runValidators: true
    });

    if (!theatre) {
        const error = new Error("Theater not found");
        error.statusCode = 404;
        throw error;
    }
    return theatre;
};


const deleteTheatreService = async (tId) => {
    const result = await Theatre.findByIdAndDelete(tId);
    if (!result) {
        const error = new Error("Theater not found");
        error.statusCode = 404;
        throw error;
    }
    return result;
};


const addMovieInTheatreService = async (tId, mId) => {
    const validMovie = await Movie.exists({ _id: mId });
    if (!validMovie) {
        throw new ApiError(400, "Invalid movie entry");
    }

    const result = await Theatre.findByIdAndUpdate(
        tId,
        { $addToSet: { movies: mId } },
        { new: true }
    ).select({ movies: 1 })
        .populate("movies")
        .lean();

    if (!result) {
        throw new ApiError(404, "Theatre not found");
    }

    return result;
}


const deleteMovieInTheatreService = async (tId, mId) => {
    const result = await Theatre.updateOne(
        { _id: tId },
        { $pull: { movies: mId } },
        { new: true }
    );

    if (result.matchedCount === 0) {
        throw new ApiError(404, "Theatre not found");
    }
    return result;
}

export {
    getTheatreByFilterService,
    getTheatreByIdService,
    createTheatreService,
    updateTheatreService,
    deleteTheatreService,
    addMovieInTheatreService,
    deleteMovieInTheatreService,
};