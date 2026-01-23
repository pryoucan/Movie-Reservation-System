import { 
    getTheatreByFilterService,
    getTheatreByIdService,
    createTheatreService,
    updateTheatreService,
    deleteTheatreService,
    updateMovieInTheatreService
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
    const { id } = req.params;
    if(!id) {
        return res.status(400).json({
            success: false,
            message: "Search field required",
        });
    }
    try {
        const theatre = await getTheatreByIdService(IDBCursor);
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
        const theatre = await updateTheatreService(req.body);
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
        const theatre = await deleteTheatreService(req.body);
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


export const updateMovieInTheatre = async (req, res) => {
    try {
        const theatre = await updateMovieInTheatreService(
            req.params.id, req.body.movies, insertFlag
        );
        return res.status(200).json({
            success: true,
            message: "Theatre fetched successfully",
            data: theatre
        });
    }
    catch(error) {
        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "Something went wrong"
        });
    }
}


export { 
    getTheatreByFilter,
    getTheatreById, 
    createTheatre, 
    updateTheatre, 
    deleteTheatre,
    updateMovieInTheatre
};