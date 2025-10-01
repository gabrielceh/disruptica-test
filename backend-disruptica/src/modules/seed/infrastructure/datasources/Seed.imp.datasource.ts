import bcrypt from "bcrypt";
import { AppDataSource } from "@src/core/infraestructure/config/datasource";
import { User } from "@src/modules/auth/domain/entities";
import {  Patient } from "@src/modules/patients/domain/entities";
import { patientsMock, usersData } from "../mocks";
import { SeedDataSource } from "../../domain/datasources";


export class SeedDatasourceImp implements SeedDataSource {
  private userRepo = AppDataSource.getRepository(User);
  private patientRepo = AppDataSource.getRepository(Patient);

 async generate() {
  try {
      const users = [];
      for (const u of usersData) {
        const user = new User();
        user.id = u.id;
        user.name = u.name;
        user.email = u.email;
        user.password = await bcrypt.hash(u.password, 10);
        user.role = u.role;
        users.push(user);
      }
      await this.userRepo.save(users);
      // --- Seed Patients ---
      await this.patientRepo.save(patientsMock);
      return true;
    
  } catch (error) {
    throw new Error("Seed failed");
  }

 } // --- Seed Users ---
}
