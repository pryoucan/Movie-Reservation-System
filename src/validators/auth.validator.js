import { z } from "zod";

const userRegisterValidator = z.object({
    username:
        z.string().min(3, "Username must be at least 3 characters long")
            .regex(/^[a-zA-Z0-9_]+$/, "Username must only contain letters, numbers, and underscores")
            .trim(),

    mobile:
        z.string().regex(/^\d{10}$/, "Enter a valid 10-digit phone number")
            .trim(),

    email:
        z.string().trim().toLowerCase().email("Invalid email format"),

    password:
        z.string({ required_error: "Password is required" })
            .min(8, "Password must be at least 8 characters long")
            .max(20, "Password must not exceed 20 characters"),
});


const userLoginValidator = z.object({

    email:
        z.string().trim().toLowerCase().email("Invalid email format"),

    password:
        z.string({ required_error: "Password is required" })
            .min(8, "Password must be at least 8 characters long")
            .max(20, "Password must not exceed 20 characters"),
});


export { userRegisterValidator, userLoginValidator };