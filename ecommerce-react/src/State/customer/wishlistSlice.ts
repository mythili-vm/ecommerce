import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Wishlist, WishlistState } from "../../types/wishlisrTypes";
import { api } from "../../config/Api";

const initialState: WishlistState = {
  wishlist: null,
  loading: false,
  error: null,
};

export const getWishlistByUserId = createAsyncThunk(
  "wishlist/getWishlistByUserId",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/wishlist", {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      });
      console.log("Wishlist fetched", response.data);
      return response.data;
    } catch (error: any) {
      console.log("error - - -", error);
      return rejectWithValue(
        error.response.data.message || "Failed to fetch wishlist"
      );
    }
  }
);

export const addproductToWishlist = createAsyncThunk(
  "wishlist/addproductToWishlist",
  async ({ productId }: { productId: number }, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `/api/wishlist/add-product/${productId}`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        }
      );
      console.log("Product added to wishlist", response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response.data.message || "Failed to add product to wishlist"
      );
    }
  }
);

//Slice
export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    resetWishlistState: (state) => {
        state = initialState;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWishlistByUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWishlistByUserId.fulfilled, (state, action:PayloadAction<Wishlist>) => {
        
        state.wishlist = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getWishlistByUserId.rejected, (state, action:PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(addproductToWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addproductToWishlist.fulfilled, (state, action:PayloadAction<Wishlist>) => {
        state.wishlist = action.payload;
        state.loading = false;
      })
      .addCase(addproductToWishlist.rejected, (state, action:PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetWishlistState } = wishlistSlice.actions;

export default wishlistSlice.reducer;
