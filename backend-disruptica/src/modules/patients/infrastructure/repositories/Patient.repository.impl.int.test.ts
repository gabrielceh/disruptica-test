import { Gender, Patient } from "../../domain/entities";
import { LocalPatientDatasource } from "../datasources";
import { PatientRepositoryImpl } from "./Patient.repository.impl";


describe("PatientRepositoryImpl (integration with memory datasource)", () => {
  let repo: PatientRepositoryImpl;
  let ds: LocalPatientDatasource;

  beforeEach(() => {
    ds = new LocalPatientDatasource();
    repo = new PatientRepositoryImpl(ds);
  });

  it("create + getActivePatients via repository funciona", async () => {
    const p = new Patient({
      id: "r1",
      name: "Luis",
      lastName: "Martinez",
      birthDate: new Date("1991-11-11"),
      gender: Gender.MALE,
    });
    await repo.create(p);

    const active = await repo.getActivePatients();
    expect(active).toHaveLength(1);
    expect(active[0].id).toBe("r1");
  });

  it("deactivate via repository desactiva", async () => {
    const p = new Patient({
      id: "r2",
      name: "Rosa",
      lastName: "Diaz",
      birthDate: new Date("1988-08-08"),
      gender: Gender.FEMALE,
    });
    await repo.create(p);

    await repo.deactivate("r2");
    const active = await repo.getActivePatients();
    expect(active).toHaveLength(0);
  });
});
