export class ApiResponse<T> {
  constructor(
    public status: "success" | "error",
    public message: string,
    public data?: T
  ) {}

  static success<T>(data: T, message = "OK") {
    return new ApiResponse("success", message, data);
  }

  static error(message: string, data?: any) {
    return new ApiResponse("error", message,  data === undefined ? null : data);
  }
}