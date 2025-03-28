import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/Api";
import { Product } from "../../types/ProductTypes";

const API_URL = "/products";

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (productId: number, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/${productId}`);
      console.log("fetch by product id", response.data);
      return response.data;
    } catch (error: any) {
      console.log("error - - -", error);
      rejectWithValue(error.message);
    }
  }
);

export const searchProduct = createAsyncThunk(
  "products/searchProduct",
  async (query, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/search`, {
        params: {
          query,
        },
      });
      console.log("search products", response.data);
      return response.data;
    } catch (error: any) {
      console.log("error - - -", error);
      rejectWithValue(error.message);
    }
  }
);

export const fetchAllProducts = createAsyncThunk<any, any>(
  "products/fetchAllProducts",
  async (params, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}`, {
        params: {
          ...params,
          pageNumber: params.pageNumber || 0,
        },
      });
      console.log("all products", response.data);
      return response.data;
    } catch (error: any) {
      console.log("error - - -", error);
      rejectWithValue(error.message);
    }
  }
);

interface PoductState {
  product: Product | null;
  products: Product[];
  totalPages: number;
  loading: boolean;
  error: string | null | undefined;
  searchproduct: Product[];
}

const initialState: PoductState = {
  product: null,
  products: [],
  totalPages: 1,
  loading: false,
  error: null,
  searchproduct: [],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.content;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(searchProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(searchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
