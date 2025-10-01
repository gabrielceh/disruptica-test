import { PatientDatasource } from "@modules/patients/domain/datasources";
import { Consultation, Patient } from "@modules/patients/domain/entities";
import { AddConsultationDTO, CreatePatientDTO } from "../../domain/dto";
import { AppDataSource } from "@src/core/infraestructure/config/datasource";
import { ILike } from "typeorm";


export class DbPatientsDatasource implements PatientDatasource {
  private patients = AppDataSource.getRepository(Patient);
  private consultationDataSource = AppDataSource.getRepository(Consultation);

  private async _foundPatient(patientId: string): Promise<Patient | null> {
    return this.patients.findOne({
      where: { id: patientId },
      relations: ["consultations"],
    });
  }
  

  async getActivePatients(): Promise<Patient[]> {
    return this.patients.find({
      where: { isActive: true },
      relations: ["consultations"],
    });
  }

  async getPatientById(patientId:string): Promise<Patient | null> {
    return this.patients.findOne({
      where: { id: patientId },
      relations: ["consultations"],
    });
  }

  async findByName(name: string): Promise<Patient[]> {
    return this.patients.find({
      where: [
        { name: ILike(`%${name}%`) },
        {lastName: ILike(`%${name}%`)}
      ],
      relations: ["consultations"],
    });
  }

  async create(dto: CreatePatientDTO): Promise<Patient> {
    const patient = this.patients.create({
      ...dto,
      isActive: true,
    });
    return this.patients.save(patient);
  }

  async update(patient: Patient): Promise<Patient> {
    const existing = await this._foundPatient(patient.id);

    if (!existing) {
      throw new Error(`Patient with id ${patient.id} not found`);
    }
    return this.patients.save({
      ...existing,
      ...patient,
    });
  }

  async deactivate(patientId: string): Promise<boolean> {
    const patient = await this._foundPatient(patientId);
    
    if (!patient){
      return false;
    } 
    await this.patients.update(patientId, { isActive: false });
    return true;
  }

  async activate(patientId: string): Promise<boolean> {
    const patient = await this._foundPatient(patientId);
    
    if (!patient){
      return false;
    } 
    await this.patients.update(patientId, { isActive: true });
    return true;
  }

  async addConsultation(patientId: string, newConsultation: AddConsultationDTO): Promise<Consultation> {
    const patient = await this._foundPatient(patientId);
    if (!patient) throw new Error("Patient not found");

    if(!newConsultation.observations || !newConsultation.reason){
      throw new Error("Observations and reason are required");
    }
     const consultation = this.consultationDataSource.create({
      ...newConsultation,
      date: newConsultation.date || new Date(),
      patient,
    });
    return this.consultationDataSource.save(consultation);

  }
}
