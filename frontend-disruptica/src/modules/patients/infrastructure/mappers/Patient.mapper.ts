import  { Gender } from "@/core/domain/entities";
import type { ConsultationResponse, PatientResponse } from "@modules/patients/infrastructure/models";
import type { Consultation, Patient } from "../../domain/entities";

export class PatientMapper {
  static fromModelToEntity(model: PatientResponse): Patient {
    return {
      id:            model.id,
      name:          model.name,
      lastName:      model.lastName,
      birthDate:     model.birthDate,
      gender:        model.gender == 'F' ? Gender.F : model.gender == 'M' ? Gender.M : Gender.F,
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