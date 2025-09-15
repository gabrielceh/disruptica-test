import { ApiAuthUserDatasource } from '@modules/auth/infrastructure/datasources'
import { AuthRespositoryImpl } from '@modules/auth/infrastructure/repositories/Auth.repository.impl';
import { LoginUsecase } from '@modules/auth/application/usecases';
  
const datasource = new ApiAuthUserDatasource();
const repository = new AuthRespositoryImpl(datasource);

export const loginUsecase = new LoginUsecase(repository);