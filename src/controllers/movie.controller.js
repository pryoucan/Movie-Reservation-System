import { createMovieService, deleteMovieService, getMovieByIdService, getMovieByNameService, updateMovieService } from "../services/movie.service.js";



const getMovieByName = async (req, res) => {
    const { q } = req.query;
    try {
        const movie = await getMovieByNameService(q);
        return res.status(200).json({
            success: true,
            message: "Movie fetched successfully",
            data: movie
        });
    }
    catch (error) {
        return res.status(error?.statusCode || 500).json({
            success: false,
            message: error?.message || "Something went wrong"
        });
    }
};


const getMovieById = async (req, res) => {
    const { id } = req.params;
    try {
        const movie = await getMovieByIdService(id);
        return res.status(200).json({
            success: true,
            message: "Movie fetched successfully",
            data: movie
        });
    }
    catch (error) {
        return res.status(error?.statusCode || 500).json({
            success: false,
            message: error?.message || "Something went wrong"
        });
    }
};


const createMovie = async (req, res) => {
    try {
        const movie = await createMovieService(req.body);
        return res.status(201).json({
            success: true,
            message: "Movie created successfully",
            data: movie
        });
    }
    catch(error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });   
    }
};


const updateMovie = async (req, res) => {
    const { id } = req.params;
    try {
        const movie = await updateMovieService(id, req.body);
        return res.status(201).json({
            success: true,
            message: "Movie updated successfully",
            data: movie
        });
    }
    catch(error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
};


const deleteMovie = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await deleteMovieService(id);
        return res.status(200).json({
            success: true,
            message: "Movie deleted successfully",
            data: result.acknowledegement
        });
    }
    catch(error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};


export { getMovieByName, getMovieById, createMovie, updateMovie, deleteMovie };