import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HomeCategory, HomeData } from "../../types/HomeCategoryTypes";
import { api } from "../../config/Api";

interface HomeState {
  homePageData: HomeData | null;
  homeCategories: HomeCategory[];
  loading: boolean;
  error: string | null;
}

const initialState: HomeState = {
  homePageData: null,
  homeCategories: [],
  loading: false,
  error: null,
};

export const createHomeCategories = createAsyncThunk<HomeData, HomeCategory[]>(
  "home/createHomeCategories",
  async (homeCategories, { rejectWithValue }) => {
    try {
      const response = await api.post(`/home/categories`, homeCategories);
      console.log("Home Categories created", response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response.data.message || "Failed to create home categories"
      );
    }
  }
);

export const getHomeCategories = createAsyncThunk<HomeData, void>(
  "home/getHomeCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`/home-categories`);
      console.log("Home Categories fetched", response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response.data.message || "Failed to fetch home categories"
      );
    }
  }
);

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createHomeCategories.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(createHomeCategories.fulfilled, (state, action) => {
      state.loading = false;
      state.homePageData = action.payload;
    });

    builder.addCase(createHomeCategories.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(getHomeCategories.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(getHomeCategories.fulfilled, (state, action) => {
      state.loading = false;
      state.homePageData = action.payload;
    });

    builder.addCase(getHomeCategories.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default homeSlice.reducer;
