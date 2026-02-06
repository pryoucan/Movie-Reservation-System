import { 
    getTheatreByFilterService,
    getTheatreByIdService,
    createTheatreService,
    updateTheatreService,
    deleteTheatreService,
    addMovieInTheatreService,
    deleteMovieInTheatreService,
} from "../services/theatre.service.js";


const getTheatreByFilter = async (req, res) => {
    try {
        const theatre = await getTheatreByFilterService(req.query);
        return res.status(200).json({
            success: true,
            message: "Theatre fetched successfully",
            data: theatre
        });
    }
    catch(error) {
        return res.status(error?.statusCode || 500).json({
            success: false,
            message: error?.message || "Something went wrong"
        });
    }
};


const getTheatreById = async (req, res) => {
    try {
        const theatre = await getTheatreByIdService(req.params.tId);
        return res.status(200).json({
            success: true,
            message: "Theatre fetched successfully",
            data: theatre
        });
    }
    catch(error) {
        return res.status(error?.statusCode || 500).json({
            success: false,
            message: error?.message || "Something went wrong"
        });
    }
};


const createTheatre = async (req, res) => {
    try {
        const theatre = await createTheatreService(req.body);
        return res.status(201).json({
            success: true,
            message: "Theatre created successfully",
            data: theatre
        });
    }
    catch(error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};


const updateTheatre = async (req, res) => {
    try {
        const theatre = await updateTheatreService(req.params.tId, req.body);
        return res.status(200).json({
            success: true,
            message: "Theatre updated successfully",
            data: theatre
        });
    }
    catch(error) {
        return res.status(error?.statusCode || 500).json({
            success: false,
            message: error?.message || "Something went wrong"
        });
    }
};


const deleteTheatre = async (req, res) => {
    try {
        const theatre = await deleteTheatreService(req.params.tId);
        return res.status(200).json({
            success: true,
            message: "Theatre deleted successfully",
            data: theatre
        });
    }
    catch(error) {
        return res.status(error?.statusCode || 500).json({
            success: false,
            message: error?.message || "Something went wrong"
        });
    }
};


const addMovieInTheatre = async (req, res) => {
    try {
        const theatre = await addMovieInTheatreService(
            req.params.tId, req.params.mId
        );
        return res.status(200).json({
            success: true,
            message: "Movie added successfully",
            data: theatre
        });
    }
    catch(error) {
        return res.status(error.statusCode || 500).json({
            success: false,
            message: error?.message || "Something went wrong"
        });
    }
}


const deleteMovieInTheatre = async (req, res) => {
    try {
        const result = await deleteMovieInTheatreService(
            req.params.tId, req.params.mId
        );
        return res.status(200).json({
            success: true,
            message: "Movie deleted successfully",
            data: result
        });
    }
    catch(error) {
        return res.status(error?.statusCose || 500).json({
            success: false,
            message: error?.message || "Something went wrong"
        });
    }
};


export { 
    getTheatreByFilter,
    getTheatreById, 
    createTheatre, 
    updateTheatre, 
    deleteTheatre,
    addMovieInTheatre,
    deleteMovieInTheatre,
};