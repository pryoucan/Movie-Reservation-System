const validateBody = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.body);
    if(!result.success) {
        return res.status(422).json({
            success: false,
            message: "Validation failed",
            errors: result.error.issues.map((i) => i.message)
        });
    }
    req.body = result.data;
    return next();
};


const validateQuery = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.query);
    if(!result.success) {
        return res.status(422).json({
            success: false,
            message: "Validation failed",
            errors: result.error.issues.map((i) => i.message)
        });
    }
    req.query = result.data;
    return next();
};


export { validateBody, validateQuery };