import { Router } from "express";
import { SeedDatasourceImp } from "../infrastructure/datasources";
import { SeedRepositoryImp } from "../infrastructure/repositories";
import { GenerateSeedUseCase } from "../application/usecases";
import { SeedController } from "../controllers";


const router = Router();

const datasource = new SeedDatasourceImp();
const repository = new SeedRepositoryImp(datasource);
const generateSeedUseCase = new GenerateSeedUseCase(repository);
const seedController = new SeedController(generateSeedUseCase);

router.post("/", (req, res)=>
  seedController.generateSeed(req, res)
);

export default router;