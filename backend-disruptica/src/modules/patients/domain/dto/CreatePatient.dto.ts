import { Gender } from "../entities";

export interface CreatePatientDTO {
  name: string;
  lastName: string;
  birthDate: Date;
  gender: Gender;
}
