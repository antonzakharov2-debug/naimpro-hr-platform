export interface CreateVacancyRequest {
  title: string;
  description: string;
  requirements: string;
}

export interface VacanciesState {
  items: Vacancy[];
  selected: Vacancy | null;
  loading: boolean;
  error: string | null;
}
export interface Vacancy {
  _id: string;
  title: string;
  description: string;
  requirements: string;
  status: 'Active' | 'Closed' | 'Hidden';
  createdAt: string;
  updatedAt: string;
}
export interface UpdateVacancyRequest {
  title: string;
  description: string;
  requirements: string;
}
