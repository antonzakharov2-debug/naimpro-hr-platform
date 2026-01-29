// Дані, які відправляємо на бек
export interface RegisterRequest {
  email: string;
  password: string;
}

// Відповідь від бекенду при успіху
export interface RegisterResponse {
  message: string;
  userId: string;
}

// Стандартна помилка API
export interface ApiError {
  message: string;
}
