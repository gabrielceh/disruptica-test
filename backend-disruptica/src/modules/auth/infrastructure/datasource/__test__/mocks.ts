import bcrypt from 'bcrypt';

import { User } from '@src/modules/auth/domain/entities';

export const mockUserDataSource = {
  findByEmailAndPassowrd: jest.fn(),
};

const password = 'secret123';

// Creamos un usuario con contraseña hasheada
export const mockUser: User = Object.assign(new User(), {
  id: 'uuid-1234',
  email: 'test@example.com',
  password: bcrypt.hashSync(password, 10),
  name: 'Test User',
  role: 'user',
});
