import { Router } from "express";
import { createMovie, deleteMovie, getMovieById, getMovieByName, updateMovie } from "../controllers/movie.controller.js";
import { validateBody } from "../middlewares/validate.middleware.js";
import { createMovieValidator } from "../validators/movie.validator.js";

export const movieRoute = Router();

movieRoute.post("/", validateBody(createMovieValidator), createMovie);

movieRoute.get("/", getMovieByName);
movieRoute.get("/:id", getMovieById);

movieRoute.put("/:id", updateMovie);

movieRoute.delete("/:id", deleteMovie);