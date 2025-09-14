import { Consultation, Gender, Patient } from "../../domain/entities";
import { LocalPatientDatasource } from "./LocalPatient.datasource";


describe("PatientMemoryDatasource", () => {
  let ds: LocalPatientDatasource;

  beforeEach(() => {
    ds = new LocalPatientDatasource();
  });

  it("create + getActivePatients debe retornar pacientes activos", async () => {
    const p = new Patient({
      name: "Laura",
      lastName: "Gómez",
      birthDate: new Date("1985-09-12"),
      gender: Gender.FEMALE,
    });

    await ds.create(p);

    const actives = await ds.getActivePatients();
    expect(actives).toHaveLength(1);
    expect(typeof actives[0].id).toBe("string");
    expect(actives[0].id).toBeDefined();
  });

  it("findByName debe buscar por nombre o apellido (case-insensitive)", async () => {
    const p = new Patient({
      name: "Juan",
      lastName: "Perez",
      birthDate: new Date("1990-01-01"),
      gender: Gender.MALE,
    });
    await ds.create(p);

    const foundByName = await ds.findByName("juan");
    expect(foundByName).toHaveLength(1);

    const foundByLast = await ds.findByName("PEREZ");
    expect(foundByLast).toHaveLength(1);
  });

  it("deactivate y activate deben cambiar isActive", async () => {
    const patient = new Patient({
      id: "p3",
      name: "Ana",
      lastName: "Lopez",
      birthDate: new Date("1975-05-05"),
      gender: Gender.FEMALE,
    });
    await ds.create(patient);

    await ds.deactivate(patient.id);
    let actives = await ds.getActivePatients();
    expect(actives).toHaveLength(0);

    await ds.activate("p3");
    actives = await ds.getActivePatients();
    expect(actives).toHaveLength(1);
  });

  it("update debe modificar los datos del paciente", async () => {
    const patient = new Patient({
      name: "Miguel",
      lastName: "Ramirez",
      birthDate: new Date("1980-03-03"),
      gender: Gender.MALE,
    });
    await ds.create(patient);

    patient.lastName = "Rivera";
    await ds.update(patient);

    const patientFound = await ds.findByName("Rivera");
    expect(patientFound).toHaveLength(1);
    expect(typeof patientFound[0].id).toBe("string");
    expect(patientFound[0].id).toBeDefined();
  });

  it("addConsultation agrega una consulta al paciente", async () => {
    const patient = new Patient({
      id: "p5",
      name: "Carmen",
      lastName: "Soto",
      birthDate: new Date("1992-07-07"),
      gender: Gender.FEMALE,
    });
    await ds.create(patient);

    const consultation = { date: new Date("2025-01-01"), reason: "Control", observations: "OK"};
    await ds.addConsultation("p5", consultation);

    const found = (await ds.findByName("Carmen"))[0];
    expect(found.consultations).toHaveLength(1);
    expect(found.consultations[0].reason).toBe("Control");
  });

  it("addConsultation en id inexistente lanza error", async () => {
    const c = { date: new Date(), reason: "Motivo", observations: "Obs"};
    await expect(ds.addConsultation("no-id", c)).rejects.toThrow("Patient not found");
  });
});
