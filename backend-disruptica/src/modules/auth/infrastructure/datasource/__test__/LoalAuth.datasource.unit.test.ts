import { LocalAuthDatasource } from "../LocalAuth.datasource";
import { usersData } from "../../mock";

describe("LocalAuthDatasource", () => {
  let datasource: LocalAuthDatasource;

  beforeEach(() => {
    datasource = new LocalAuthDatasource();
  });

  it("✅ should return a user if email and password are correct", async () => {
    const testUser = usersData[0];
    await expect(
      datasource.findByEmailAndPassowrd(testUser.email, testUser.password)
    ).resolves.toEqual(testUser);
  });

  it("❌ should throw an error if email is incorrect", async () => {
    await expect(
      datasource.findByEmailAndPassowrd("wrong@example.com", "password123")
    ).rejects.toThrow("Email or password incorrect");
  });

  it("❌ should throw an error if password is incorrect", async () => {
    const testUser = usersData[0];
    await expect(
      datasource.findByEmailAndPassowrd(testUser.email, "wrongpassword")
    ).rejects.toThrow("Email or password incorrect");
  });

  it("❌ should throw an error if both email and password are incorrect", async () => {
    await expect(
      datasource.findByEmailAndPassowrd("wrong@example.com", "wrongpassword")
    ).rejects.toThrow("Email or password incorrect");
  });
});
