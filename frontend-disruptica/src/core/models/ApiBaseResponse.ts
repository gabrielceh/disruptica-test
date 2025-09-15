export type StatusTypeResponse = "success" | "error";

export interface BaseResponse<T> {
  status:  StatusTypeResponse;
  message: string;
  data:    T;
}
