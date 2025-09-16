import { GetPatientByIdUsecase, GetPatientsUsecase } from "../application/usecases";
import { ApiPatientsDatasource } from "../infrastructure/datasources";
import { PatientsRespositoryImpl } from "../infrastructure/repositories";

const datasource = new ApiPatientsDatasource();
const repository = new PatientsRespositoryImpl(datasource);

export const getPatientsUsecase = new GetPatientsUsecase(repository);
export const getPatientByIdUsecase = new GetPatientByIdUsecase(repository);