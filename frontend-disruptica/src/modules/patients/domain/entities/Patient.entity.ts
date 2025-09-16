export interface Patient {
    id:            string;
    name:          string;
    lastName:      string;
    dateOfBirth:   Date;
    gender:        Gender;
    consultations: Consultation[];
    isActive:      boolean;
}

export interface Consultation {
    id:           string;
    date:         Date;
    reason:       string;
    observations: string;
}

export const GenderType = {
    F : "F",
    M : "M",
    O : "O",
} as const;

export type Gender = typeof GenderType[keyof typeof GenderType];
