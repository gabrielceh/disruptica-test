import { Request, Response } from "express";
import { 
  ActivatePatientUseCase, 
  AddConsultationUseCase, 
  CreatePatientUseCase, 
  DeactivatePatientUseCase, 
  FindPatientByNameUseCase, 
  GetActivePatientsUseCase, 
  UpdatePatientUseCase 
} from "@modules/patients/application/usecases";
import { Patient } from "@modules/patients/domain/entities";
import { PatientRepository } from "@modules/patients/domain/repositories";
import { ApiResponse } from "@src/core/shared";


export class PatientController {
  constructor(private readonly repo: PatientRepository) {}

  create = async (req: Request, res: Response) => {
    try {
      const patientData = req.body;
      const usecase = new CreatePatientUseCase(this.repo);
      const newPatient = await usecase.execute(new Patient(patientData));
      return res.status(201).json(ApiResponse.success(newPatient));
    } catch (error: any) {
      return res.status(400).json(ApiResponse.error(error.message));
    }
  };

  getActive = async (_req: Request, res: Response) => {
    try {
      const usecase = new GetActivePatientsUseCase(this.repo);
      const patients = await usecase.execute();
      return res.json(ApiResponse.success(patients));
    } catch (error: any) {
      return res.status(500).json(ApiResponse.error(error.message));
    }
  };

  findByName = async (req: Request, res: Response) => {
    try {
      const { name } = req.params;
      const usecase = new FindPatientByNameUseCase(this.repo);
      const patients = await usecase.execute(name);
      return res.json(ApiResponse.success(patients));
    } catch (error: any) {
      return res.status(500).json(ApiResponse.error(error.message));
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const patient = new Patient(req.body);
      const usecase = new UpdatePatientUseCase(this.repo);
      const updated = await usecase.execute(patient);
      return res.json(ApiResponse.success(updated));
    } catch (error: any) {
      return res.status(400).json(ApiResponse.error(error.message));
    }
  };

  activate = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const usecase = new ActivatePatientUseCase(this.repo);
      const wasAtivated = await usecase.execute(id);
      if(!wasAtivated){
        return res.status(400).json(ApiResponse.error(`Patient with id ${id} not found`));
      }
      return res.json(ApiResponse.success(`Patient with id ${id} was activated`));
    } catch (error: any) {
      return res.status(400).json(ApiResponse.error(error.message));
    }
  };

  deactivate = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const usecase = new DeactivatePatientUseCase(this.repo);
      const wasDeactivate =await usecase.execute(id);
      if(!wasDeactivate){
        return res.status(400).json(ApiResponse.error(`Patient with id ${id} not found`));
      }
      return res.json(ApiResponse.success(`Patient with id ${id} was deleted`));
    } catch (error: any) {
      return res.status(400).json(ApiResponse.error(error.message));
    }
  };

  addConsultation = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const consultation = req.body;
      const usecase = new AddConsultationUseCase(this.repo);
      const result = await usecase.execute(id, consultation);
      return res.status(201).json(ApiResponse.success(result));
    } catch (error: any) {
      return res.status(400).json(ApiResponse.error(error.message));
    }
  };
}
