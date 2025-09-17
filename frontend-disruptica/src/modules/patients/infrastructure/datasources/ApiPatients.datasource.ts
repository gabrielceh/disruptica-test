import { AxiosService } from "@/core/axios/axiosService";
import type { BaseResponse } from "@/core/models";
import { errorResponse } from "@/core/utils";
import { PatientsDatasource } from "@modules/patients/domain/datasources";
import type { Consultation, Patient } from "@modules/patients/domain/entities";
import { ConsultationResponse, PatientResponse } from "../models";
import { ConsultationMapper, PatientMapper } from "../mappers";

export class ApiPatientsDatasource implements PatientsDatasource {
    private axiosService =  AxiosService;
  

  async getPatients(): Promise<BaseResponse<Patient[] | null>> {
    try {
      const response:BaseResponse<Patient[]> = await this.axiosService.get({
        path: '/patients',
      });
      if (response.status !== 'success') throw new Error(response.message);
      
      const model = response.data.map((patient) => PatientResponse.fromJSON(patient));
      const entity = model.map((patient) => PatientMapper.fromModelToEntity(patient));

      return {
        ...response,
        data:    entity,
      }
          
    } catch (error) {
      return errorResponse(error);
    }
  }

  async getPatient(patientId: string): Promise<BaseResponse<Patient | null>> {
    try {
      const response:BaseResponse<Patient[]> = await this.axiosService.get({
        path: `/patients/patient/${patientId}`,
      });
      if (response.status !== 'success') throw new Error(response.message);
      
      const model = PatientResponse.fromJSON(response.data);
      const entity = PatientMapper.fromModelToEntity(model);

      return {
        ...response,
        data:    entity,
      }
          
    } catch (error) {
      return errorResponse(error);
    }
  }

  async updatePatient(patient: Partial<Patient>): Promise<BaseResponse<Patient | null>> {
    try {
      const response:BaseResponse<Patient> = await this.axiosService.put({
        path: `/patients/update/${patient.id}`,
        data: patient,
      });
      if (response.status !== 'success') throw new Error(response.message);
      
      const model = PatientResponse.fromJSON(response.data);
      const entity = PatientMapper.fromModelToEntity(model);

      return {
        ...response,
        data:    entity,
      }
          
    } catch (error) {
      return errorResponse(error);
    }
  }

  async addConsutlation(patientId: string, newConsultation: Partial<Consultation>): Promise<BaseResponse<Consultation | null>> {
      try {
        const response:BaseResponse<Consultation> = await this.axiosService.post({
          path: `/patients/consultation/${patientId}`,
          data: newConsultation,
        });
        if (response.status !== 'success') throw new Error(response.message);
        
        const model = ConsultationResponse.fromJSON(response.data);
        const entity = ConsultationMapper.fromModelToEntity(model);

        return {
          ...response,
          data:    entity,
        }
            
      } catch (error) {
        return errorResponse(error);
      }
  }
}