import express from "express";
import patientsRoutes from "@modules/patients/routes/Patients.routes";
import authRoutes from "@modules/auth/router/Auth.routes";
import seedRoutes from "@modules/seed/router/Sedd.routes";
import { corsMiddleware } from "./core/shared/middlewares";

const app = express();
app.use(corsMiddleware);
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/patients", patientsRoutes);
app.use("/seed", seedRoutes);

export default app;
