import bcrypt from "bcrypt";
import { AppDataSource } from "@src/core/infraestructure/config/datasource";
import { User } from "@src/modules/auth/domain/entities";
import {  Consultation, Patient } from "@src/modules/patients/domain/entities";
import { patientsMock, usersData } from "../mocks";
import { SeedDataSource } from "../../domain/datasources";


export class SeedDatasourceImp implements SeedDataSource {
  private userRepo = AppDataSource.getRepository(User);
  private patientRepo = AppDataSource.getRepository(Patient);
  private consultationRepo = AppDataSource.getRepository(Consultation);

 async generate() {
    await this.consultationRepo.createQueryBuilder().delete().execute();
    await this.patientRepo.createQueryBuilder().delete().execute();
    await this.userRepo.createQueryBuilder().delete().execute();

    try {
        // --- Seed Users ---
        const users = [];
        for (const u of usersData) {
          const user = new User();
          user.name = u.name;
          user.email = u.email;
          user.password = u.password;
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

  }
}
