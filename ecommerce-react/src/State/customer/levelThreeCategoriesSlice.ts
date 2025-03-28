import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/Api";
import { CategoryState } from "./categorySlice";

export const fetchLevelThreeCategories = createAsyncThunk(
    "categories/fetchLevelThreeCategories",
    async (_, { rejectWithValue }) => {
      try {
        const response = await api.get(`/home/level-three`);
        return response.data;
      } catch (error: any) {
        return rejectWithValue(error.response?.data || "Failed to fetch categories");
      }
    }
  )

  // Initial state
const initialState: CategoryState = {
    categories: [],
    loading: false,
    error: null,
    categoryList: []  
  };

  const levelThreeCategoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
      resetCategories: (state) => {
        state.categories = [];
        state.error = null;
      },
    },
    extraReducers: (builder) => {
 
      builder
        .addCase(fetchLevelThreeCategories.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchLevelThreeCategories.fulfilled, (state, action) => {
          state.loading = false;
          state.categories = action.payload;
        })
        .addCase(fetchLevelThreeCategories.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        });
    },
  });

  export default levelThreeCategoriesSlice.reducer;