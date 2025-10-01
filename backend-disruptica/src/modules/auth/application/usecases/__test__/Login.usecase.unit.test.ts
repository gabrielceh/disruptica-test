// src/modules/auth/application/use-cases/__test__/LoginUseCase.unit.test.ts
import { LoginUseCase } from '../Login.usecase';
import { AuthRepository } from '@modules/auth/domain/repositories';
import { User } from '@modules/auth/domain/entities';

describe('LoginUseCase', () => {
  let mockRepository: jest.Mocked<AuthRepository>;
  let useCase: LoginUseCase;
  let mockUser: User;

  beforeAll(() => {
    // Mock repository
    mockRepository = {
      findByEmailAndPassword: jest.fn(),
    };

    useCase = new LoginUseCase(mockRepository);

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

  it('✅ should return a user when repository finds one', async () => {
    mockRepository.findByEmailAndPassword.mockResolvedValue(mockUser);

    const result = await useCase.execute('test@example.com', 'secret123');

    expect(mockRepository.findByEmailAndPassword).toHaveBeenCalledWith(
      'test@example.com',
      'secret123'
    );
    expect(result).toBe(mockUser);
  });

  it('❌ should return null when repository returns null', async () => {
    mockRepository.findByEmailAndPassword.mockResolvedValue(null);

    const result = await useCase.execute('notfound@example.com', 'secret123');

    expect(result).toBeNull();
  });

  it('❌ should throw an error when repository throws', async () => {
    mockRepository.findByEmailAndPassword.mockRejectedValue(
      new Error('Repository error')
    );

    await expect(
      useCase.execute('test@example.com', 'wrongpass')
    ).rejects.toThrow('Repository error');
  });
});
