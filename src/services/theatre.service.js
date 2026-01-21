import { Theatre } from "../models/theatre.model.js";


const getTheatreByNameService = async (q) => {
    const theatre = await Theatre.find({ $text: { $search: q } });
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


export {  
    getTheatreByNameService,
    getTheatreByIdService,
    createTheatreService,
    updateTheatreService,
    deleteTheatreService
};