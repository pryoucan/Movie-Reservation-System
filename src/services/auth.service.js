import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

const userRegisterService = async ({ username, mobile, email, password }) => {
    const existingUser = await User.findOne({
        $or: [{ username }, { mobile }, { email }]
    });

    if (existingUser) {
        const error = new Error("User already exists with this entry");
        error.statusCode = 409;
        throw error;
    }

    const user = await User.create({
        username,
        mobile,
        email,
        password
    });

    const safeUser = user.toObject();
    delete safeUser.password;
    return safeUser;
};


const userLoginService = async ({ email, password }) => {
    const user = await User.findOne({ email });
    if(!user || !(await user.comparePassword(password))) {
        const error = new Error("Invalid credentials");
        error.statusCode = 401;
        throw error;
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, { expiresIn: "1d" });
    return { token };
};


export { userRegisterService, userLoginService };