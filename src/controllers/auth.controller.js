import { userLoginService, userRegisterService } from "../services/auth.service.js";

const userRegister = async (req, res) => {
    try {
        const user = await userRegisterService(req.body);
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: user
        });
    }
    catch(error) {
        return res.status(error.statusCode || 500).json({
            success: false,
            message: error?.message || "Something went wrong"
        });
    }
};


const userLogin = async (req, res) => {
    try {
        const result = await userLoginService(req.body);
        return res.status(200).json({
            success: true,
            message: "Logged in successfully",
            data: result
        });
    }
    catch(error) {
        return res.status(error?.statusCode || 500).json({
            success: false,
            message: error.message || "Something went wrong"
        });
    }
};


export { userRegister, userLogin };