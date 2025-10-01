import 'reflect-metadata';
import { DataSource } from 'typeorm';

import { User } from '@src/modules/auth/domain/entities';
import { environments } from './environments';
import { Patient, Consultation } from '@src/modules/patients/domain/entities';


export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: environments.postgresUser,
  password: environments.postgresPassword,
  database: environments.postgresDb,
  synchronize: true, // ⚠️ true solo en desarrollo
  logging: false,
  entities: [User, Patient, Consultation],
});
