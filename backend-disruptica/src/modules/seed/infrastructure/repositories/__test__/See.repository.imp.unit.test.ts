import { SeedDataSource } from "@src/modules/seed/domain/datasources";
import { SeedRepositoryImp } from "../Seed.respository.imp";


describe("SeedRepositoryImp", () => {
  let repository: SeedRepositoryImp;
  let mockDatasource: SeedDataSource;

  beforeEach(() => {
    // Creamos un mock simple del datasource
    mockDatasource = {
      generate: jest.fn(),
    };

    repository = new SeedRepositoryImp(mockDatasource);
  });

  it("✅ should call datasource.generate and return its result", async () => {
    const mockResult = { message: "Seeded successfully" };
    (mockDatasource.generate as jest.Mock).mockResolvedValue(mockResult);

    const result = await repository.generate();

    expect(mockDatasource.generate).toHaveBeenCalledTimes(1);
    expect(result).toBe(mockResult);
  });

  it("❌ should throw if datasource.generate throws", async () => {
    (mockDatasource.generate as jest.Mock).mockRejectedValue(new Error("Datasource error"));

    await expect(repository.generate()).rejects.toThrow("Datasource error");
    expect(mockDatasource.generate).toHaveBeenCalledTimes(1);
  });
});
