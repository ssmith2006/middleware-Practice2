import express from "express";
import bookRoutes from "./routes/bookRoutes.js";
import logger from "./middlewares/logger.js";
import borrowRoutes from "./routes/borrowRoutes.js";
import authRoutes from ".//routes/authRoutes.js";

const app = express();
app.use(express.json()); //1st middleware (app level middleware) receiving and sending using JSON
app.use(logger);

app.use("/", borrowRoutes);
app.use("/api", bookRoutes);
app.use('/', authRoutes)

export default app;
