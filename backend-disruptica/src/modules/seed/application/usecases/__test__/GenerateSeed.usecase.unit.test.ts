import { SeedDataRepository } from "@src/modules/seed/domain/repositories";
import { GenerateSeedUseCase } from "../GenerateSeed.usecase";



describe("GenerateSeedUseCase", () => {
  let useCase: GenerateSeedUseCase;
  let mockRepository: SeedDataRepository;

  beforeEach(() => {
    mockRepository = {
      generate: jest.fn(),
    };
    useCase = new GenerateSeedUseCase(mockRepository);
  });

  it("✅ should call repository.generate and return its result", async () => {
    const mockResult = { message: "Seeded successfully" };
    (mockRepository.generate as jest.Mock).mockResolvedValue(mockResult);

    const result = await useCase.execute();

    expect(mockRepository.generate).toHaveBeenCalledTimes(1);
    expect(result).toBe(mockResult);
  });

  it("❌ should throw if repository.generate throws", async () => {
    (mockRepository.generate as jest.Mock).mockRejectedValue(new Error("Repository error"));

    await expect(useCase.execute()).rejects.toThrow("Repository error");
    expect(mockRepository.generate).toHaveBeenCalledTimes(1);
  });
});
