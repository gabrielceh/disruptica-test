import express from "express";
import authRoutes from "@modules/auth/controllers/Auth.routes";
import patientsRoutes from "@modules/patients/routes/Patients.routes";

const app = express();
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/patients", patientsRoutes);

export default app;
