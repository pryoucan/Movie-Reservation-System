import { z } from "zod";

const createTheatreValidator = z.object({
    name:
        z.string().min(3, "Name must be atleast 3 characters long")
        .trim(),
    
    description:
        z.string().min(10, "Description is required")
        .trim(),
    
    city:
        z.string().min(3, "City is required").trim(),

    pincode:
        z.string().length(6)
        .regex(/^\d{6}$/, "Pincode must be exactly 6 digits"),

    address:
        z.string().min(5, "Address is required")
        .trim()

}).strict();


const cantEmpty = (field) => {
    return z.string().trim().min(1, `${field} cannot be empty`).optional();
};

const filterQuerySchema = z.object({
    name: cantEmpty("name"),
    city: cantEmpty("city"),
    pincode: cantEmpty("pincode")
            .refine((v) => v === undefined || /^\d{6}$/.test(v),
        "pincode must be 6 digits")
}).strict();


export { createTheatreValidator, filterQuerySchema };