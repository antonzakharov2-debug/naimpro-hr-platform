import { api } from '../../../api/axios';
import type { CreateCandidateRequest, Candidate } from '../types';

export const createCandidate = async (
  data: CreateCandidateRequest
): Promise<void> => {
  await api.post('/candidates', data);
};

export const getCandidates = async (): Promise<Candidate[]> => {
  const response = await api.get<Candidate[]>('/candidates');
  return response.data;
};
export const getCandidateById = async (id: string): Promise<Candidate> => {
  const res = await api.get(`/candidates/${id}`);
  return res.data;
};

export const updateCandidate = async (
  id: string,
  data: CreateCandidateRequest
): Promise<void> => {
  await api.put(`/candidates/${id}`, data);
};

export const deleteCandidate = async (id: string): Promise<void> => {
  await api.delete(`/candidates/${id}`);
};

export const assignVacancyToCandidate = async (
  candidateId: string,
  vacancyId: string
): Promise<void> => {
  await api.post(`/candidates/${candidateId}/assign-vacancy`, { vacancyId });
};