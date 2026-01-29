export interface RegisterRequest {
  email: string;
  password: string;
}
export interface RegisterResponse {
  message: string;
  userId: string;
}
export interface ApiError {
  message: string;
}
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}
