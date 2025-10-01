import { DBAuthDatasource } from '@src/modules/auth/infrastructure/datasource/DBAuth.datasource';
import { User } from '@modules/auth/domain/entities';
import bcrypt from 'bcrypt';

// Creamos un mock de repository
const mockRepo = {
  findOne: jest.fn(),
};

// Mock de AppDataSource
jest.mock('@src/core/infraestructure/config/datasource', () => {
  return {
    AppDataSource: {
      getRepository: jest.fn().mockImplementation(() => mockRepo),
    },
  };
});


describe('DBAuthDatasource', () => {
  let datasource: DBAuthDatasource;
  let mockUser: User;

  beforeAll(async () => {
    datasource = new DBAuthDatasource();

    const hashedPassword = await bcrypt.hash('secret123', 10);
    mockUser = Object.assign(new User(), {
      id: 'uuid-1',
      email: 'test@example.com',
      password: hashedPassword,
      name: 'Test User',
      role: 'user',
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('✅ should return user when email and password are correct', async () => {
    mockRepo.findOne.mockResolvedValue(mockUser);

    const result = await datasource.findByEmailAndPassowrd(
      'test@example.com',
      'secret123'
    );

    expect(result).toBeInstanceOf(User);
    expect(result?.email).toBe('test@example.com');
  });

  it('❌ should throw error if user not found', async () => {
    mockRepo.findOne.mockResolvedValue(null);

    await expect(
      datasource.findByEmailAndPassowrd('notfound@example.com', 'secret123')
    ).rejects.toThrow('Email or password incorrect');
  });

  it('❌ should throw error if password does not match', async () => {
    mockRepo.findOne.mockResolvedValue(mockUser);

    await expect(
      datasource.findByEmailAndPassowrd('test@example.com', 'wrongPass')
    ).rejects.toThrow('Email or password incorrect');
  });
});

