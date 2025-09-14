import { LoginUseCase } from "../Login.usecase";
import { AuthRepository } from "@modules/auth/domain/repositories";
import { User } from "@modules/auth/domain/entities";

describe("LoginUseCase", () => {
  let mockRepo: jest.Mocked<AuthRepository>;
  let useCase: LoginUseCase;

  const testUser: User = new User(
    "1",
    "test@example.com",
    "password123",
    "Test User",
    "admin"
  );

  beforeEach(() => {
    mockRepo = {
      findByEmailAndPassword: jest.fn()
    } as unknown as jest.Mocked<AuthRepository>;

    useCase = new LoginUseCase(mockRepo);
  });

  it("✅ should return a user when email and password are correct", async () => {
    mockRepo.findByEmailAndPassword.mockResolvedValue(testUser);

    const result = await useCase.execute("test@example.com", "password123");

    expect(result).toEqual(testUser);
    expect(mockRepo.findByEmailAndPassword).toHaveBeenCalledWith("test@example.com", "password123");
  });

  it("❌ should return null if email/password are incorrect", async () => {
    mockRepo.findByEmailAndPassword.mockResolvedValue(null);

    const result = await useCase.execute("wrong@example.com", "wrongpass");

    expect(result).toBeNull();
    expect(mockRepo.findByEmailAndPassword).toHaveBeenCalledWith("wrong@example.com", "wrongpass");
  });

  it("❌ should throw an error if repository fails", async () => {
    mockRepo.findByEmailAndPassword.mockRejectedValue(new Error("DB error"));

    await expect(useCase.execute("test@example.com", "password123")).rejects.toThrow("DB error");
    expect(mockRepo.findByEmailAndPassword).toHaveBeenCalledWith("test@example.com", "password123");
  });
});
