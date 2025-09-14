import express from "express";
import authRoutes from "@modules/auth/router/Auth.routes";
import { corsMiddleware } from "./core/shared/middlewares";

const app = express();
app.use(corsMiddleware);
app.use(express.json());

app.use("/auth", authRoutes);

export default app;
