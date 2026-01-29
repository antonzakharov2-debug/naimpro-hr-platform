import { api } from '../../../api/axios';
import type { RegisterRequest, RegisterResponse } from '../types';

export const register = async (
  data: RegisterRequest
): Promise<RegisterResponse> => {
  const response = await api.post<RegisterResponse>(
    '/auth/register',
    data
  );
  return response.data;
};