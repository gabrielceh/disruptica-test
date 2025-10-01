// src/modules/auth/infrastructure/controllers/__test__/AuthController.unit.test.ts
import { AuthController } from '../Auth.controller';
import { LoginUseCase } from '@modules/auth/application/usecases';
import { ApiResponse } from '@src/core/shared';
import { generateToken } from '@src/core/shared/utils';
import { User } from '@modules/auth/domain/entities';

jest.mock('@src/core/shared/utils', () => ({
  generateToken: jest.fn(),
}));

describe('AuthController', () => {
  let mockLoginUseCase: jest.Mocked<LoginUseCase>;
  let controller: AuthController;
  let mockUser: User;
  let mockReq: any;
  let mockRes: any;

  beforeAll(() => {
    mockLoginUseCase = {
      execute: jest.fn(),
    } as any;

    controller = new AuthController(mockLoginUseCase);

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
    mockReq = { body: { email: 'test@example.com', password: 'secret123' } };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it('✅ should return token and user data when login is successful', async () => {
    mockLoginUseCase.execute.mockResolvedValue(mockUser);
    (generateToken as jest.Mock).mockReturnValue('mocked-jwt');

    await controller.login(mockReq, mockRes);

    expect(mockLoginUseCase.execute).toHaveBeenCalledWith(
      'test@example.com',
      'secret123'
    );
    expect(generateToken).toHaveBeenCalledWith({
      userId: mockUser.id,
      email: mockUser.email,
      role: mockUser.role,
    });
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(
      ApiResponse.success({
        token: 'mocked-jwt',
        user: {
          id: mockUser.id,
          email: mockUser.email,
          name: mockUser.name,
          role: mockUser.role,
        },
      })
    );
  });

  it('❌ should return 401 when user is not found', async () => {
    mockLoginUseCase.execute.mockResolvedValue(null);

    await controller.login(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith(
      ApiResponse.error('Email or password incorrect')
    );
  });

  it('❌ should return 401 when use case throws an error', async () => {
    mockLoginUseCase.execute.mockRejectedValue(new Error('Unexpected error'));

    await controller.login(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith(
      ApiResponse.error('Unexpected error')
    );
  });
});
