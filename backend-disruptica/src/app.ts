import express from "express";
import authRoutes from "@modules/auth/controllers/AuthRoutes";

const app = express();
app.use(express.json());

app.use("/auth", authRoutes);

export default app;
