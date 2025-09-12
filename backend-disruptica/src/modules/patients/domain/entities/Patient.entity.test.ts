// src/patients/domain/entities/patient.entity.test.ts
import { Patient } from "./Patient.entity";
import { Consultation } from "./Consultation.entity";
import { Gender } from "./Gender.enum";

describe("Patient entity", () => {
  const baseProps = {
    id: "p1",
    name: "Juan",
    lastName: "Pérez",
    birthDate: new Date("1990-01-01"),
    gender: Gender.MALE,
  };

  it("should create with default values", () => {
    const p = new Patient(baseProps);
    expect(p.isActive).toBe(true);
    expect(p.consultations).toHaveLength(0);
  });

  it("should accept initial consultations", () => {
    const c = new Consultation("c1", new Date(), "dolor de cabeza", "sin observaciones");
    const p = new Patient({ ...baseProps, consultations: [c] });
    expect(p.consultations).toHaveLength(1);
    expect(p.consultations[0].id).toBe("c1");
  });

  it("addConsultation should push a new consultation", () => {
    const p = new Patient(baseProps);
    const c = new Consultation("c2", new Date(), "control", "todo OK");
    p.addConsultation(c);
    expect(p.consultations).toContain(c);
    expect(p.consultations).toHaveLength(1);
  });

  it("deactivate and activate toggle isActive", () => {
    const p = new Patient(baseProps);
    p.deactivate();
    expect(p.isActive).toBe(false);
    p.activate();
    expect(p.isActive).toBe(true);
  });

  it("id remains unchanged", () => {
    const p = new Patient(baseProps);
    expect(p.id).toBe("p1");
    // Nota: la readonly se verifica en tiempo de compilación; en runtime comprobamos que no se ha modificado.
    // p.id = "otro";
    expect(p.id).toBe("p1");
  });
});
