import { Router } from "express";

import { userLogin, userRegister } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validateBody } from "../middlewares/validate.middleware.js";
import { userLoginValidator, userRegisterValidator } from "../validators/auth.validator.js";

export const authRoute = Router();

authRoute.post("/register", validateBody(userRegisterValidator), userRegister);
authRoute.post("/login", validateBody(userLoginValidator), authMiddleware, userLogin);