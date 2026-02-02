import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createVacancy,
  getVacancies,
  getVacancyById,
  updateVacancy,
  hideVacancy,
  deleteVacancy,
} from '../api/vacancies.api';
import type {
  CreateVacancyRequest,
  VacanciesState,
  Vacancy,
} from '../types';

const initialState: VacanciesState = {
  items: [],
  selected: null,
  loading: false,
  error: null,
};

// CREATE VACANCY
export const createVacancyAsync = createAsyncThunk(
  'vacancies/create',
  async (data: CreateVacancyRequest, { rejectWithValue }) => {
    try {
      return await createVacancy(data);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to create vacancy'
      );
    }
  }
);

// GET VACANCIES
export const fetchVacanciesAsync = createAsyncThunk(
  'vacancies/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await getVacancies();
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to load vacancies'
      );
    }
  }
);

// GET VACANCY BY ID (FOR EDIT)
export const fetchVacancyByIdAsync = createAsyncThunk(
  'vacancies/fetchById',
  async (id: string, { rejectWithValue }) => {
    try {
      return await getVacancyById(id);
    } catch {
      return rejectWithValue('Failed to load vacancy');
    }
  }
);

// UPDATE VACANCY
export const updateVacancyAsync = createAsyncThunk(
  'vacancies/update',
  async (
    { id, data }: { id: string; data: CreateVacancyRequest },
    { rejectWithValue }
  ) => {
    try {
      return await updateVacancy(id, data);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update vacancy'
      );
    }
  }
);
export const hideVacancyAsync = createAsyncThunk(
  'vacancies/hide',
  async (id: string, { rejectWithValue }) => {
    try {
      await hideVacancy(id);
      return id;
    } catch {
      return rejectWithValue('Failed to hide vacancy');
    }
  }
);

// DELETE VACANCY
export const deleteVacancyAsync = createAsyncThunk(
  'vacancies/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      await deleteVacancy(id);
      return id; // повертаємо id
    } catch {
      return rejectWithValue('Failed to delete vacancy');
    }
  }
);

const vacanciesSlice = createSlice({
  name: 'vacancies',
  initialState,
  reducers: {
    resetVacanciesState(state) {
      state.loading = false;
      state.error = null;
      state.selected = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // CREATE
      .addCase(createVacancyAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createVacancyAsync.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createVacancyAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // FETCH LIST
      .addCase(fetchVacanciesAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVacanciesAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload as Vacancy[];
      })
      .addCase(fetchVacanciesAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // FETCH ONE
      .addCase(fetchVacancyByIdAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.selected = null;
      })
      .addCase(fetchVacancyByIdAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.selected = action.payload as Vacancy;
      })
      .addCase(fetchVacancyByIdAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // UPDATE
      .addCase(updateVacancyAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateVacancyAsync.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateVacancyAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
       // HIDE
      .addCase(hideVacancyAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(hideVacancyAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(
          (vacancy) => vacancy._id !== action.payload
        );
      })
      .addCase(hideVacancyAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // DELETE
      .addCase(deleteVacancyAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteVacancyAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(
          (vacancy) => vacancy._id !== action.payload
        );
      })
      .addCase(deleteVacancyAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetVacanciesState } = vacanciesSlice.actions;
export default vacanciesSlice.reducer;
