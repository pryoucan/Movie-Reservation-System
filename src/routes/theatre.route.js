import { Router } from "express";

import { 
    createTheatre, 
    deleteTheatre, 
    getTheatreById, 
    getTheatreByFilter, 
    updateTheatre, 
    updateMovieInTheatre
} from "../controllers/theatre.controller.js";
import { validateBody, validateQuery } from "../middlewares/validate.middleware.js";
import { createTheatreValidator, filterQuerySchema } from "../validators/theatre.validator.js";

export const theatreRoute = Router();

theatreRoute.post("/",  validateBody(createTheatreValidator), createTheatre);

theatreRoute.get("/", validateQuery(filterQuerySchema), getTheatreByFilter);
theatreRoute.get("/:id/movies", updateMovieInTheatre);
theatreRoute.get("/:id", getTheatreById);

theatreRoute.put("/:id", updateTheatre);

theatreRoute.delete("/:id", deleteTheatre);