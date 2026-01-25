import { Theatre } from "../models/theatre.model.js";
import { Movie } from "../models/movie.model.js";
import { ApiError } from "../utils/error_class.js";

const getTheatreByFilterService = async (q) => {
    let pagination = {};
    let filter = {};
    if(q && q.name) {
        filter.name = q.name;
    }
    if(q && q.pincode) {
        filter.pincode = q.pincode;
    }
    if(q && q.city) {
        filter.city = q.city;
    }

    if(q && q.limit) {
        pagination.limit = Number(q.limit);
        if(isNaN(pagination.limit) 
            || pagination.limit < 10 
            || pagination.limit > 50) {
            pagination.limit = 10;
        }
    }
    if(q && q.skip) {
        pagination.skip = Number(q.skip);
        let perPage = (pagination.limit) ? pagination.limit : 10; 
        if(isNaN(pagination.skip) || pagination.skip === 0) {
            pagination.skip = 1;
        }
        pagination.skip = perPage * pagination.skip;
    }

    const theatre = await Theatre.find(filter, {}, pagination);
    if(theatre.length === 0) {
        const error = new Error("Theater not found");
        error.statusCode = 404;
        throw error;
    }
    return theatre;
};


const getTheatreByIdService = async (id) => {
    const theatre = await Theatre.findById(id);
    if(!theatre) {
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


const updateTheatreService = async (id, data) => {
    const theatre = await Theatre.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true
    });
    
    if(!theatre) {
        const error = new Error("Theater not found");
        error.statusCode = 404;
        throw error;
    }
    return theatre;
};


const deleteTheatreService = async (id) => {
    const result = await Theatre.findByIdAndDelete(id);
        if(!result) {
        const error = new Error("Theater not found");
        error.statusCode = 404;
        throw error;
    }
    return result;
};


const addMovieInTheatreService = async (theatreId, moviesIds) => {
    const theatre = await Theatre.findById(theatreId);
    if(!theatre) throw new ApiError(404, "Theatre not found");
    
    const currMovies = new Set(theatre.movies.map((m) => m.toString()));
    const moviesToAdd = moviesIds.filter((mi) => !currMovies.has(mi));
    if(moviesToAdd.length === 0) {
        throw new ApiError(409, "The movies are already present");
    }

    const existMovies = await Movie.find({ _id: { $in: moviesToAdd } })
    .select("_id").lean();
    console.log(existMovies);
    if(existMovies.length === 0) {
        throw new ApiError(400, "Invalid movie Ids");
    }
    
    const result = await Theatre.findByIdAndUpdate(
        theatreId,
        { $addToSet: { movies: { $each: existMovies } } },
        { new: true }
    );
    await result.populate("movies");
    return result;
}


const deleteMovieInTheatreService = async (theatreId, moviesIds) => {    
    const result = await Theatre.findByIdAndUpdate(
        theatreId,
        { $pull: { movies: { $in: moviesIds } } },
        { new: true }
    );

    if(!result) throw new ApiError(404, "Theatre not found");
    await result.populate("movies");
    return result;
};


export {  
    getTheatreByFilterService,
    getTheatreByIdService,
    createTheatreService,
    updateTheatreService,
    deleteTheatreService,
    addMovieInTheatreService,
    deleteMovieInTheatreService,
};