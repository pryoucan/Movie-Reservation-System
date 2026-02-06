import { Router } from "express";

import {
    createTheatre,
    deleteTheatre,
    getTheatreById,
    getTheatreByFilter,
    updateTheatre,
    addMovieInTheatre,
    deleteMovieInTheatre,
} from "../controllers/theatre.controller.js";
import { validateBody, validateQuery } from "../middlewares/validate.middleware.js";
import {
    createTheatreValidator,
    filterQuerySchemaValidator,
} from "../validators/theatre.validator.js";

export const theatreRoute = Router();

theatreRoute.post("/", validateBody(createTheatreValidator), createTheatre);

theatreRoute.get("/", validateQuery(filterQuerySchemaValidator), getTheatreByFilter);
theatreRoute.get("/:tId", getTheatreById);

theatreRoute.patch("/:tId", updateTheatre);

theatreRoute.post("/:tId/movies/:mId", addMovieInTheatre);

theatreRoute.delete("/:tId/movies/:mId", deleteMovieInTheatre);
theatreRoute.delete("/:tId", deleteTheatre);