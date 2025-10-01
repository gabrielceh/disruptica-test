import { PatientDatasource } from "@modules/patients/domain/datasources";
import { Consultation, Patient } from "@modules/patients/domain/entities";
import { patientsMock } from "../mocks/patients.mock";


export class DbPatientsDatasource implements PatientDatasource {
  private patients: Patient[] = patientsMock;

  async getActivePatients(): Promise<Patient[]> {
    return this.patients.filter(p => p.isActive);
  }

  async getPatientById(patientId:string): Promise<Patient | null> {
    const patientFound = this.patients.find(p => p.id === patientId && p.isActive);
    return patientFound ?? null;
  }

  async findByName(name: string): Promise<Patient[]> {
    const lower = name.toLowerCase();
    return this.patients.filter(
      p =>
        (p.name.toLowerCase().includes(lower) ||
        p.lastName.toLowerCase().includes(lower)) && p.isActive
    );
  }

  async create(patient: Patient): Promise<Patient> {
    this.patients.push(patient);
    return patient;
  }

  async update(patient: Patient): Promise<Patient> {
    const index = this.patients.findIndex(p => p.id === patient.id);
    if (index === -1) throw new Error("Patient not found");

    this.patients[index] = new Patient({
      ...this.patients[index],
      name: patient.name,
      lastName: patient.lastName,
      birthDate: patient.birthDate,
      gender: patient.gender,
    }) ;

    return patient;
  }

  async deactivate(patientId: string): Promise<boolean> {
    
    const patient = this.patients.find(p => p.id === patientId);
    
    if (!patient){
      return false;
    } 
    patient.deactivate();
    return true;
  }

  async activate(patientId: string): Promise<boolean> {
    const patient = this.patients.find(p => p.id === patientId);
    if (!patient){ 
      return false;  
    }
    patient.activate();
    return true;
  }

  async addConsultation(patientId: string, newConsultation: Partial<Consultation>): Promise<Consultation> {
    const patient = this.patients.find(p => p.id === patientId);
    if (!patient) throw new Error("Patient not found");

    if(!newConsultation.observations || !newConsultation.reason){
      throw new Error("Observations and reason are required");
    }
    const consultationToAdd = {
        id: crypto.randomUUID(),
        date: newConsultation.date || new Date(),
        reason: newConsultation.reason,
        observations: newConsultation.observations,

    }

    patient.addConsultation(consultationToAdd);
    return consultationToAdd;

  }
}
