import { Theatre } from "../models/theatre.model.js";


const getTheatreByFilterService = async (q) => {
    const filter = {};
    if(q && q.name) {
        filter.name = q.name;
    }
    if(q && q.pincode) {
        filter.pincode = q.pincode;
    }
    if(q && q.city) {
        filter.city = q.city;
    }

    // todo: searching filter by indexes is not working: Object error
    const theatre = await Theatre.find(filter);
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


const updateMovieInTheatreService = async (theatreId, moviesIds, insertFlag) => {
    const theatre = await Theatre.findById(theatreId);
    if(!theatre) {
        const error = new Error("Theatre not found");
        error.statusCode = 404;
        throw error;
    }

    let cntr = 0;
    if(insertFlag) {
        moviesIds.forEach(mi => {
            if(theatre.movies.includes(mi)) {
                cntr++;
            }
            else {
                theatre.movies.push(mi);
            }

            if(cntr === moviesIds.length) {
                const error = new Error("Movie is already present in theatre");
                error.statusCode = 409;
                throw error;
            }
        });
    }
    else if(!insertFlag && theatre.movies.length > 0) {
        let moviesToDelete = theatre.movies;
        moviesIds.forEach(mi => {
            moviesToDelete = moviesToDelete.filter(mtd => mtd === mi);
        });
        theatre.movies = moviesToDelete;
    }
    await theatre.save();
    return theatre.populate("movies");
}

export {  
    getTheatreByFilterService,
    getTheatreByIdService,
    createTheatreService,
    updateTheatreService,
    deleteTheatreService,
    updateMovieInTheatreService
};