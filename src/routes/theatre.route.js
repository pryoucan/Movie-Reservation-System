import { Router } from "express";

import { 
    createTheatre, 
    deleteTheatre, 
    getTheatreById, 
    getTheatreByName, 
    updateTheatre } from "../controllers/theatre.controller.js";
import { validateBody } from "../middlewares/validate.middleware.js";
import { createTheatreValidator } from "../validators/theatre.validator.js";

export const theatreRoute = Router();

theatreRoute.post("/",  validateBody(createTheatreValidator), createTheatre);
theatreRoute.get("/", getTheatreByName);
theatreRoute.get("/:id", getTheatreById);
theatreRoute.put("/:id", updateTheatre);
theatreRoute.delete("/:id", deleteTheatre);