import { api } from '../../../api/axios';
import type { CreateVacancyRequest, } from '../types';
import type {  UpdateVacancyRequest, } from '../types';
import type { Vacancy, } from '../types';

export const createVacancy = async (data: CreateVacancyRequest) => {
  const response = await api.post('/vacancies', data);
  return response.data;
};
export const getVacancies = async (): Promise<Vacancy[]> => {
  const response = await api.get('/vacancies');
  return response.data;
};
export const getVacancyById = async (id: string) => {
  const response = await api.get(`/vacancies/${id}`);
  return response.data;
};

export const updateVacancy = async (
  id: string,
  data: UpdateVacancyRequest
) => {
  const response = await api.put(`/vacancies/${id}`, data);
  return response.data;
};
export const hideVacancy = async (id: string) => {
  const response = await api.patch(`/vacancies/${id}/hide`);
  return response.data;
};

export const deleteVacancy = async (id: string) => {
  const response = await api.delete(`/vacancies/${id}`);
  return response.data;
};