export type User = {
  readonly id: number;
  readonly username: string;
  readonly email: string;
  readonly phoneNumber: string;
};

export type ApiError = {
  statusCode: number;
  code?: string;
  error: string;
  message: string;
};
