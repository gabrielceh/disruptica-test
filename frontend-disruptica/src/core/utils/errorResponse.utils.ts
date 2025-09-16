import { AxiosError } from "axios";
import type { BaseResponse } from "../models";

export const errorResponse = (error:unknown): BaseResponse<null> => {
  if(error instanceof AxiosError) {
    return {
      status:  'error',
      message: error.response?.data.message,
      data:    null,
    }
  }

  return {
    status:  'error',
    message: `${error}`,
    data:    null,
  }
}