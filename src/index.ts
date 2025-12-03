import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { connectDB } from "./config/db";
import { startApp } from "./config/app";

import userRouter from "./routes/user.routes";
import chatRouter from "./routes/chat.routes";
import { notFoundMiddleware } from "./middlewares/not-found.middleware";
import { healthMiddleware } from "./middlewares/health.middleware";
import { errorMiddleware } from "./middlewares/error.middleware";


const app = express();


/***** MIDDLEWARES *****/

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(notFoundMiddleware);
app.use(errorMiddleware);

app.get("/health", healthMiddleware);

/***** ROUTES *****/

app.use('/api/user', userRouter);
app.use('/api/chat', chatRouter);


/***** CONFIG *****/

connectDB()
startApp(app)
