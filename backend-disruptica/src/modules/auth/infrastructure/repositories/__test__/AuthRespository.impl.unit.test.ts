import { AuthRepositoryImpl } from "../Auth.repository.impl";
import { LocalAuthDatasource } from "@modules/auth/infrastructure/datasource/LocalAuth.datasource";
import { usersData } from "@modules/auth/infrastructure/mock";
import { User } from "@modules/auth/domain/entities";

describe("AuthRepositoryImpl", () => {
  let mockDatasource: jest.Mocked<LocalAuthDatasource>;
  let repository: AuthRepositoryImpl;

  beforeEach(() => {
    mockDatasource = {
      findByEmailAndPassowrd: jest.fn()
    } as unknown as jest.Mocked<LocalAuthDatasource>;

    repository = new AuthRepositoryImpl(mockDatasource);
  });

  it("✅ should return a user when email and password are correct", async () => {
    const testUser: User = usersData[0];
    mockDatasource.findByEmailAndPassowrd.mockResolvedValue(testUser);

    const result = await repository.findByEmailAndPassword(testUser.email, testUser.password);
    expect(result).toEqual(testUser);
    expect(mockDatasource.findByEmailAndPassowrd).toHaveBeenCalledWith(testUser.email, testUser.password);
  });

  it("❌ should return null or throw if email/password are incorrect", async () => {
    mockDatasource.findByEmailAndPassowrd.mockRejectedValue(new Error("Email or password incorrect"));

    await expect(repository.findByEmailAndPassword("wrong@example.com", "wrongpass"))
      .rejects.toThrow("Email or password incorrect");
    expect(mockDatasource.findByEmailAndPassowrd).toHaveBeenCalledWith("wrong@example.com", "wrongpass");
  });
});
