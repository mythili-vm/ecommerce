import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Seller } from "../../types/SellerTypes";
import { api } from "../../config/Api";

export interface AdminSellerState {
  sellers: Seller[];
  loading: boolean;
  error: string | null;
}

const initialState: AdminSellerState = {
  sellers: [],
  loading: false,
  error: null,
};

const API_URL = "/api/admin";

export const fetchAllSellers = createAsyncThunk(
  "/admin/fetchAllSellers",
  async (status: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/sellers`, {
        params: { status },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      console.log(response.data, "fetch all sellers");
      return response.data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const updateSellerStatus = createAsyncThunk(
  "/admin/updateSellerStatus",
  async (
    { sellerId, status }: { sellerId: number; status: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.patch(
        `${API_URL}/seller/${sellerId}/status/${status}`,{},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );
      return response.data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const adminSellerSlice = createSlice({
  name: "adminSeller",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllSellers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllSellers.fulfilled, (state, action) => {
        state.loading = false;
        state.sellers = action.payload;
      })
      .addCase(fetchAllSellers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(updateSellerStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSellerStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.sellers = state.sellers.map((seller) => {
          if (seller.id === action.payload.id) {
            return action.payload;
          }
          return seller;
        });
      })
      .addCase(updateSellerStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default adminSellerSlice.reducer;
