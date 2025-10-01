// seedDatasource.test.ts
import bcrypt from "bcrypt";
import { patientsMock, usersData } from "../../mocks";




const mockSave = jest.fn();
jest.mock("@src/core/infraestructure/config/datasource", () => ({
  AppDataSource: {
    getRepository: jest.fn().mockReturnValue({
      save: mockSave,
    }),
  },
}));

import { SeedDatasourceImp } from "../Seed.imp.datasource";

describe("SeedDatasourceImp", () => {
  let datasource: SeedDatasourceImp;

  beforeEach(() => {
    jest.clearAllMocks();
    datasource = new SeedDatasourceImp();
  });

  it("✅ should seed users and patients correctly", async () => {
    // Mockeamos save para que resuelva
    mockSave.mockResolvedValueOnce([]); // usuarios
    mockSave.mockResolvedValueOnce([]); // pacientes

    const result = await datasource.generate();

    // Verificamos que se haya llamado save dos veces
    expect(mockSave).toHaveBeenCalledTimes(2);

    // Revisamos usuarios
    const usersSaved = mockSave.mock.calls[0][0];
    expect(usersSaved.length).toBe(usersData.length);
    for (let i = 0; i < usersData.length; i++) {
      expect(usersSaved[i].email).toBe(usersData[i].email);
      expect(usersSaved[i].name).toBe(usersData[i].name);
      expect(usersSaved[i].role).toBe(usersData[i].role);
      // Password hasheada
      expect(usersSaved[i].password).not.toBe(usersData[i].password);
      const match = await bcrypt.compare(usersData[i].password, usersSaved[i].password);
      expect(match).toBe(true);
    }

    // Revisamos pacientes
    const patientsSaved = mockSave.mock.calls[1][0];
    expect(patientsSaved.length).toBe(patientsMock.length);

    // Mensaje de retorno
    expect(result).toEqual(true);
  });

  it("❌ should throw error if saving users fails", async () => {
    mockSave.mockRejectedValueOnce(new Error("Seed failed"));

    await expect(datasource.generate()).rejects.toThrow("Seed failed");
  });

  it("❌ should throw error if saving patients fails", async () => {
    mockSave.mockResolvedValueOnce([]); // usuarios guardados
    mockSave.mockRejectedValueOnce(new Error("Seed failed"));

    await expect(datasource.generate()).rejects.toThrow("Seed failed");
  });
});