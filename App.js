import express from "express";
import cors from "cors";
import userRouter from "./src/routes/userRoute.js";
import blogRouter from "./src/routes/blogRoute.js";

const app = express();

app.use(express.json());
app.use(cors());

// API Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/blogs", blogRouter);

export default app;
