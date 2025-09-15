import { AxiosService } from "@/core/axios/axiosService";
import type { AuthUser } from "@/core/domain/entities";
import type { BaseResponse } from "@/core/models";
import type { AuthDatasource } from "@modules/auth/domain/datasources";
import { AuthUserResponse } from "../models";
import { AuthUserMapper } from "../mappers/AuthUser.mapper";
import { AxiosError } from "axios";

export class ApiAuthUserDatasource implements AuthDatasource {
  private axiosService =  AxiosService;

  async login(email: string, password: string): Promise<BaseResponse<AuthUser| null>> {
    try {
      const response:BaseResponse<AuthUserResponse> = await this.axiosService.post({
        path:    '/auth/login',
        data:    { email, password },
      });

      if (response.status !== 'success') {
        throw new Error(response.message);
      }
    
      const model = AuthUserResponse.fromJSON(response.data);
      const entity = AuthUserMapper.fromModelToEntity(model);

      return {
        status:  response.status,
        message: response.message,
        data:    entity,
      }
    } catch (error) {
      if(error instanceof AxiosError) {
        return {
          status:  'error',
          message: `${error.response?.data.message}`,
          data:    null,
        }
      }
      
      return {
        status:  'error',
        message: `${error}`,
        data:    null,
      }
    }
      
  }


}