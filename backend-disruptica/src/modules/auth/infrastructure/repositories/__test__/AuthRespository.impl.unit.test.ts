import { AuthRepositoryImpl } from '@modules/auth/infrastructure/repositories/Auth.repository.impl';
import { AuthDatasource } from '@modules/auth/domain/datasource';
import { User } from '@modules/auth/domain/entities';

describe('AuthRepositoryImpl', () => {
  let mockDatasource: jest.Mocked<AuthDatasource>;
  let repository: AuthRepositoryImpl;
  let mockUser: User;

  beforeAll(() => {
    mockDatasource = {
      findByEmailAndPassowrd: jest.fn(),
    };

    repository = new AuthRepositoryImpl(mockDatasource);

    mockUser = Object.assign(new User(), {
      id: 'uuid-1',
      email: 'test@example.com',
      password: 'hashed-pass',
      name: 'Test User',
      role: 'user',
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('✅ should return a user when datasource finds one', async () => {
    mockDatasource.findByEmailAndPassowrd.mockResolvedValue(mockUser);

    const result = await repository.findByEmailAndPassword(
      'test@example.com',
      'secret123'
    );

    expect(mockDatasource.findByEmailAndPassowrd).toHaveBeenCalledWith(
      'test@example.com',
      'secret123'
    );
    expect(result).toBe(mockUser);
  });

  it('❌ should return null when datasource returns null', async () => {
    mockDatasource.findByEmailAndPassowrd.mockResolvedValue(null);

    const result = await repository.findByEmailAndPassword(
      'notfound@example.com',
      'secret123'
    );

    expect(result).toBeNull();
  });

  it('❌ should throw an error when datasource throws', async () => {
    mockDatasource.findByEmailAndPassowrd.mockRejectedValue(
      new Error('Datasource error')
    );

    await expect(
      repository.findByEmailAndPassword('test@example.com', 'wrongPass')
    ).rejects.toThrow('Datasource error');
  });
});
