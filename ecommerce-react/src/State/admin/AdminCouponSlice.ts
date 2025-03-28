import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Coupon } from "../../types/couponTypes";
import { api } from "../../config/Api";

const API_URL = "/api/admin";

//Async Thunks
export const createCoupon = createAsyncThunk<
  Coupon,
  { coupon: Coupon; jwt: string },
  { rejectValue: string }
>("coupon/createCoupon", async ({ coupon, jwt }, { rejectWithValue }) => {
  try {
    const response = await api.post(`${API_URL}/create`, coupon, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response.data.message || "Failed to create coupon"
    );
  }
});

//delete coupon by id
export const deleteCoupon = createAsyncThunk<
  string,
  { id: number; jwt: string },
  { rejectValue: string }
>("coupon/deleteCoupon", async ({ id, jwt }, { rejectWithValue }) => {
  try {
    const response = await api.delete(`${API_URL}/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response.data.message || "Failed to delete coupon"
    );
  }
});

//get all coupons
export const getAllCoupons = createAsyncThunk<
  Coupon[],
  { jwt: string },
  { rejectValue: string }
>("coupon/getAllCoupons", async ({ jwt }, { rejectWithValue }) => {
  try {
    const response = await api.get(`${API_URL}/all`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response.data.message || "Failed to get all coupons"
    );
  }
});

interface CouponState {
  coupons: Coupon[] | [];
  coupon: Coupon | null;
  loading: boolean;
  error: string | null;
}

const initialState: CouponState = {
  coupon: null,
  loading: false,
  error: null,
  coupons: [],
};

export const adminCoupnSlice = createSlice({
  name: "adminCoupon",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createCoupon.fulfilled, (state, action) => {
      state.coupon = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(createCoupon.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createCoupon.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    //delete coupon
    builder
      .addCase(deleteCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteCoupon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    //get all coupons
    builder
      .addCase(getAllCoupons.fulfilled, (state, action) => {
        state.coupons = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getAllCoupons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCoupons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default adminCoupnSlice.reducer;
