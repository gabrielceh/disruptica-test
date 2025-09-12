import { Router } from "express";
import { LocalAuthDatasource } from "@modules/auth/infrastructure/datasource";
import { AuthRepositoryImpl } from "@modules/auth/infrastructure/repositories/AuthRepositoryImpl";
import { LoginUseCase } from "@modules/auth/application/usecases";
import { AuthController } from "./AuthController";
import { validateLogin } from "../infrastructure/middleware";

const router = Router();

const datasource = new LocalAuthDatasource();
const repository = new AuthRepositoryImpl(datasource);
const loginUseCase = new LoginUseCase(repository);
const authController = new AuthController(loginUseCase);

router.post("/login", validateLogin, (req, res)=>
  authController.login(req, res)
);

export default router;