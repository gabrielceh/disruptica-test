import express from "express";
import patientsRoutes from "@modules/patients/routes/Patients.routes";
import authRoutes from "@modules/auth/router/Auth.routes";
import { corsMiddleware } from "./core/shared/middlewares";

const app = express();
app.use(corsMiddleware);
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/patients", patientsRoutes);

export default app;
