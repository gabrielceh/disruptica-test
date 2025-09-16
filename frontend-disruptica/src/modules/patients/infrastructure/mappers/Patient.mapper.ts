import  { GenderType, type Consultation, type Patient } from "@modules/patients/domain/entities";
import type { ConsultationResponse, PatientResponse } from "@modules/patients/infrastructure/models";

export class PatientMapper {
  static fromModelToEntity(model: PatientResponse): Patient {
    return {
      id:            model.id,
      name:          model.name,
      lastName:      model.lastName,
      dateOfBirth:   model.birthDate,
      gender:        model.gender == 'F' ? GenderType.F : model.gender == 'M' ? GenderType.M : GenderType.F,
      consultations: model.consultations.map((consultation) => ConsultationMapper.fromModelToEntity(consultation)),
      isActive:      model.isActive,
    };
  }
}

export class ConsultationMapper {
  static fromModelToEntity(model: ConsultationResponse): Consultation {
    return {
      id:           model.id,
      date:         model.date,
      reason:       model.reason,
      observations: model.observations,
    };
  }
}