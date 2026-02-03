import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createCandidate,
  getCandidates,
  getCandidateById,
  updateCandidate,
  deleteCandidate,
  assignVacancyToCandidate,
} from '../api/candidates.api';

import type {
  CandidatesState,
  CreateCandidateRequest,
  Candidate,
} from '../types';

const initialState: CandidatesState = {
  items: [],
  selected: null,
  loading: false,
  error: null,
};

// CREATE
export const createCandidateAsync = createAsyncThunk(
  'candidates/create',
  async (data: CreateCandidateRequest, { rejectWithValue }) => {
    try {
      await createCandidate(data);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to create candidate'
      );
    }
  }
);

// FETCH LIST
export const fetchCandidatesAsync = createAsyncThunk(
  'candidates/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await getCandidates();
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to load candidates'
      );
    }
  }
);

// FETCH ONE
export const fetchCandidateByIdAsync = createAsyncThunk(
  'candidates/fetchById',
  async (id: string, { rejectWithValue }) => {
    try {
      return await getCandidateById(id);
    } catch {
      return rejectWithValue('Failed to load candidate');
    }
  }
);

// UPDATE
export const updateCandidateAsync = createAsyncThunk(
  'candidates/update',
  async (
    { id, data }: { id: string; data: CreateCandidateRequest },
    { rejectWithValue }
  ) => {
    try {
      await updateCandidate(id, data);
    } catch {
      return rejectWithValue('Failed to update candidate');
    }
  }
);

// DELETE
export const deleteCandidateAsync = createAsyncThunk(
  'candidates/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      await deleteCandidate(id);
      return id;
    } catch {
      return rejectWithValue('Failed to delete candidate');
    }
  }
);

// ASSIGN VACANCY
export const assignVacancyAsync = createAsyncThunk(
  'candidates/assignVacancy',
  async (
    { candidateId, vacancyId }: { candidateId: string; vacancyId: string },
    { rejectWithValue }
  ) => {
    try {
      await assignVacancyToCandidate(candidateId, vacancyId);
    } catch {
      return rejectWithValue('Failed to assign vacancy');
    }
  }
);

const candidatesSlice = createSlice({
  name: 'candidates',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // CREATE
      .addCase(createCandidateAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCandidateAsync.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createCandidateAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // FETCH LIST
      .addCase(fetchCandidatesAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCandidatesAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload as Candidate[];
      })
      .addCase(fetchCandidatesAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // FETCH ONE
      .addCase(fetchCandidateByIdAsync.pending, (state) => {
        state.loading = true;
        state.selected = null;
      })
      .addCase(fetchCandidateByIdAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.selected = action.payload as Candidate;
      })
      .addCase(fetchCandidateByIdAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // DELETE
      .addCase(deleteCandidateAsync.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (c) => c._id !== action.payload
        );
      });
  },
});

export default candidatesSlice.reducer;
