import { Movie } from "../models/movie.model.js"


const getMovieByNameService = async (q) => {
    const filter = {};
    if(Object.keys(q).length > 0) {
        if(q.title) {
            filter.title = q.title;
        }
    }
    console.log(filter);
    const movie = await Movie.find({ $text: { $search: filter.title } });
    if(movie.length === 0) {
        const error = new Error("Movie not found");
        error.statusCode = 404;
        throw error;
    }
    return movie;
};


const getMovieByIdService = async (id) => {
    const movie = await Movie.findById(id);
    if(!movie) {
        const error = new Error("Movie not found");
        error.statusCode = 404;
        throw error;
    }
    return movie;
};


const createMovieService = async (data) => {
    const movie = await Movie.create(data);
    return movie;
};


const updateMovieService = async(id, data) => {
    const movie = await Movie.findByIdAndUpdate(id, data, { 
        new: true, runValidators: true 
    });
    if(!movie) {
        const error = new Error("Movie not found");
        error.statusCode = 404;
        throw error;
    }
    return movie;
};


const deleteMovieService = async(id) => {
    const result = await Movie.findByIdAndDelete(id);
    if(!result) {
        const error = new Error("Movie not found");
        error.statusCode = 404;
        throw error;
    }
    return result;
};


export { 
    getMovieByNameService,
    getMovieByIdService,
    createMovieService,
    updateMovieService,
    deleteMovieService
};