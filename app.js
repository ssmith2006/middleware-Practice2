import express from 'express';
import bookRoutes from './routes/bookRoutes.js';
import logger from './middlewares/logger.js'
import authRoutes from "./routes/authRoutes.js";

const app = express();
app.use(express.json());
app.use(logger)


app.use('/', authRoutes);
app.use('/', bookRoutes);

export default app;
