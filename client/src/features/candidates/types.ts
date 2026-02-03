export interface Candidate {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  skills?: string;
  vacancies?: {
    _id: string;
    title: string;
    status: string;
  }[];
  createdAt: string;
  updatedAt?: string;
}

export interface CreateCandidateRequest {
  name: string;
  email: string;
  phone?: string;
  skills?: string;
}

export interface CandidatesState {
  items: Candidate[];
  selected: Candidate | null;
  loading: boolean;
  error: string | null;
}
