import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../config/Api";

// Define Category Interface
export interface AddCategory {
  id?: number;
  categoryId: string;
  name: string | null;
  parentCategory: AddCategory | null;
  level: number;
}

export interface Category {
  id: number;
  name: string;
  level: number;
  categoryId: string;
  subcategories?: Category[];
}

// Define initial state
export interface CategoryState {
  categories: Category[];
  categoryList: AddCategory[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: null,
  categoryList: []
};

// Async thunk to fetch categories from backend
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/home/categories");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch categories"
      );
    }
  }
);

export const fetchFlatCategories = createAsyncThunk(
  "categories/fetchFlatCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/home/flat-categories");
      console.log("respibse ", response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch categories"
      );
    }
  }
);

export const addCategory = createAsyncThunk(
  "categories/addCategory",
  async (category: AddCategory, { rejectWithValue }) => {
    try {
      const response = await api.post("/home/add-category", category);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to add category");
    }
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCategories.fulfilled,
        (state, action: PayloadAction<Category[]>) => {
          state.loading = false;
          state.categories = action.payload;
        }
      )
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(fetchFlatCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchFlatCategories.fulfilled,
        (state, action: PayloadAction<AddCategory[]>) => {
          state.loading = false;
          state.categoryList = action.payload;
        }
      )
      .addCase(fetchFlatCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(addCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCategory.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default categorySlice.reducer;
