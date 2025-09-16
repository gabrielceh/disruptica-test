import type { BaseResponse } from "../models";

export const errorResponse = (error:unknown): BaseResponse<null> => {
  if(error instanceof Error) {
    return {
      status:  'error',
      message: error.message,
      data:    null,
    }
  }

  return {
    status:  'error',
    message: `${error}`,
    data:    null,
  }
}