import type { GenderType } from "@/core/domain/entities";

export interface Patient {
    id:            string;
    name:          string;
    lastName:      string;
    dateOfBirth:   Date;
    gender:        GenderType;
    consultations: Consultation[];
    isActive:      boolean;
}

export interface Consultation {
    id:           string;
    date:         Date;
    reason:       string;
    observations: string;
}


