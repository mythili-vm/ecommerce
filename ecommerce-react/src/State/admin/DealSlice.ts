import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/Api";
import { ApiResponse, DealsState } from "../../types/dealTypes";

const InitialState: DealsState = {
  deals: [],
  loading: false,
  error: null,
  dealCreated: false,
  dealUpdated: false,
};

export const createDeal = createAsyncThunk(
  "deal/createDeal",
  async (deal: any, { rejectWithValue }) => {
    try {
      const response = await api.post(`/admin/deals`, deal, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt") || ""}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response.data.message || "Failed to create deal"
      );
    }
  }
);

export const getAllDeals = createAsyncThunk(
  "deal/getAllDeals",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`/admin/deals`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt") || ""}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response.data.message || "Failed to get deals"
      );
    }
  }
);

export const deleteDeal = createAsyncThunk<ApiResponse, number>(
  "deal/deleteDeal",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/admin/deals/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt") || ""}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response.data.message || "Failed to delete deal"
      );
    }
  }
);

export const updateDeal = createAsyncThunk(
  "deal/updateDeal",
  async (deal: any, { rejectWithValue }) => {
    try {
      const response = await api.put(`/admin/deals/${deal.id}`, deal, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt") || ""}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response.data.message || "Failed to update deal"
      );
    }
  }
);

const dealsSlice = createSlice({
  name: "deals",
  initialState: InitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createDeal.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createDeal.fulfilled, (state, action) => {
      state.loading = false;
      state.dealCreated = true;
      state.deals.push(action.payload);
    });
    builder.addCase(createDeal.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(getAllDeals.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllDeals.fulfilled, (state, action) => {
      state.loading = false;
      state.deals = action.payload;
    });
    builder.addCase(getAllDeals.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(deleteDeal.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteDeal.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(deleteDeal.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(updateDeal.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateDeal.fulfilled, (state, action) => {
      state.loading = false;
      state.dealUpdated = true;
      state.deals = state.deals.map((deal) =>
        deal.id === action.payload.id ? action.payload : deal
      );
    });
    builder.addCase(updateDeal.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default dealsSlice.reducer;
