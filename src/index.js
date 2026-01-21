import "./bootstrap.js";

import express from "express";

import { connectDb } from "./config/db.config.js";
import { authRoute } from "./routes/auth.route.js";
import { movieRoute } from "./routes/movie.route.js";
import { theatreRoute } from "./routes/theatre.route.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/movie", movieRoute);
app.use("/api/v1/theatre", theatreRoute)


const startServer = async () => {
    try {
        await connectDb();

        app.listen(PORT, () => {
        console.log(`Server is running on port:${PORT}`);
    });
    }
    catch(error) {
        console.log("Start up failed:", error);
        process.exit(1);
    }
};

startServer();