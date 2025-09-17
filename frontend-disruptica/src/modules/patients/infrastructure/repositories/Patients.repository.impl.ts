import type { BaseResponse } from "@/core/models";
import { PatientsRepository } from "@modules/patients/domain/repositories";
import type { PatientsDatasource } from "@modules/patients/domain/datasources";
import type { Consultation, Patient } from "@modules/patients/domain/entities";

export class PatientsRespositoryImpl implements PatientsRepository {
  datasource: PatientsDatasource;

  constructor(datasource: PatientsDatasource) {
    this.datasource = datasource;
  }
  
  async getPatients(): Promise<BaseResponse<Patient[] | null>> {
    return await this.datasource.getPatients();
  }
  
  async getPatient(patientId: string): Promise<BaseResponse<Patient | null>> {
    return await this.datasource.getPatient(patientId);
  }
      
  async updatePatient(patient: Partial<Patient>): Promise<BaseResponse<Patient | null>> {
    console.log("Repository updatePatient", patient);
    return await this.datasource.updatePatient(patient);
  }

  async addConsutlation(patientId: string, newConsultation: Partial<Consultation>): Promise<BaseResponse<Consultation | null>> {
    return await this.datasource.addConsutlation(patientId, newConsultation);
  }
} 