import { 
    getTheatreByNameService,
    getTheatreByIdService,
    createTheatreService,
    updateTheatreService,
    deleteTheatreService
} from "../services/theatre.service.js";


const getTheatreByName = async (req, res) => {
    const { q } = req.query;
    if(!q) {
        return res.status(400).json({
            success: false,
            message: "Search field required",
        });
    }
    try {
        const theatre = await getTheatreByNameService(q);
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
            message: "Theatre created successfully",
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
            message: "Theatre created successfully",
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


export { 
    getTheatreByName,
    getTheatreById, 
    createTheatre, 
    updateTheatre, 
    deleteTheatre };