import { Patient, Consultation, Gender } from "@modules/patients/domain/entities";


export const patientsMock: Patient[] = [
  new Patient({
    name: "John",
    lastName: "Smith",
    birthDate: new Date("1985-06-15"),
    gender: Gender.MALE,
    consultations: [
      new Consultation({
        date: new Date("2024-01-20"),
        reason: "Headache",
        observations: "Prescribed ibuprofen",
      }),
    ],
  }),
  new Patient({
    name: "Emily",
    lastName: "Johnson",
    birthDate: new Date("1990-09-22"),
    gender: Gender.FEMALE,
    consultations: [
      new Consultation({
        date: new Date("2023-12-10"),
        reason: "General check-up",
        observations: "No complications detected",
      }),
    ],
  }),
  new Patient({
    name: "Michael",
    lastName: "Brown",
    birthDate: new Date("1975-02-05"),
    gender: Gender.MALE,
    consultations: [],
  }),
  new Patient({
    name: "Sophia",
    lastName: "Davis",
    birthDate: new Date("2000-03-12"),
    gender: Gender.FEMALE,
    consultations: [
      new Consultation({
        date: new Date("2024-05-18"),
        reason: "Allergy",
        observations: "Treatment with antihistamines",
      }),
    ],
  }),
  new Patient({
    name: "Daniel",
    lastName: "Wilson",
    birthDate: new Date("1995-11-30"),
    gender: Gender.MALE,
    consultations: [],
  }),
  new Patient({
    name: "Olivia",
    lastName: "Miller",
    birthDate: new Date("1988-07-08"),
    gender: Gender.FEMALE,
    consultations: [
      new Consultation({
        date: new Date("2024-07-01"),
        reason: "Stomach pain",
        observations: "Ultrasound ordered",
      }),
    ],
  }),
  new Patient({
    name: "William",
    lastName: "Moore",
    birthDate: new Date("1982-04-25"),
    gender: Gender.MALE,
    consultations:[]
  }),
  new Patient({
    name: "Ava",
    lastName: "Taylor",
    birthDate: new Date("1999-10-03"),
    gender: Gender.FEMALE,
    consultations: [
      new Consultation({
        date: new Date("2024-08-10"),
        reason: "University admission check-up",
        observations: "All results normal",
      }),
    ],
  }),
  new Patient({
    name: "James",
    lastName: "Anderson",
    birthDate: new Date("1970-12-15"),
    gender: Gender.MALE,
  }),
  new Patient({
    name: "Isabella",
    lastName: "Thomas",
    birthDate: new Date("2002-05-21"),
    gender: Gender.FEMALE,
    consultations: [
      new Consultation({
        date: new Date("2024-02-11"),
        reason: "Arm fracture",
        observations: "Cast required for 6 weeks",
      }),
    ],
  }),
];
