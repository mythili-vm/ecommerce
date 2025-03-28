import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cart, CartItem } from "../../types/cartTypes";
import { RootState } from "../Store";
import { api } from "../../config/Api";
import {
  sumCartItemMrpPrice,
  sumCartItemSellingPrice,
} from "../../util/sumCartItemMrpPrice";
import { applyCoupon } from "./CouponSlice";

interface CartState {
  cart: Cart | null;
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  cart: null,
  loading: false,
  error: null,
};

// Define the base URL for the API requests
const API_URL = "/api/cart";

export const fetchUserCart = createAsyncThunk<Cart, string>(
  "cart/fetchUserCart",
  async (jwt: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      console.log("Cart fetched ", response.data);
      return response.data;
    } catch (error: any) {
      console.log("error - - -", error.response);
      return rejectWithValue("Failed to fetch user cart");
    }
  }
);

interface AddItemRequest {
  productId: number | undefined;
  size: string;
  quantity: number;
}

export const addItemToCart = createAsyncThunk<
  CartItem,
  { jwt: string | null; request: AddItemRequest }
>("cart/addItemToCart", async (args, { rejectWithValue }) => {
  const { jwt, request } = args;
  try {
    const response = await api.post(`${API_URL}/add`, request, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    console.log("Item added to cart", response.data);
    return response.data;
  } catch (error: any) {
    console.log("error - - -", error.response);
    return rejectWithValue("Failed to add item to cart");
  }
});

export const deleteCartItem = createAsyncThunk<
  CartItem,
  { jwt: string | null; cartItemId: number }
>("cart/deleteCartItem", async (args, { rejectWithValue }) => {
  const { jwt, cartItemId } = args;
  try {
    const response = await api.delete(`${API_URL}/${cartItemId}`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    console.log("Item deleted from cart", response.data);
    return response.data;
  } catch (error: any) {
    console.log("error - - -", error.response);
    return rejectWithValue("Failed to delete item from cart");
  }
});

export const updateCartItem = createAsyncThunk<
  CartItem,
  { jwt: string | null; cartItemId: number; cartItem: CartItem }
>("cart/updateCartItem", async (args, { rejectWithValue }) => {
  const { jwt, cartItemId, cartItem } = args;
  try {
    const response = await api.put(`${API_URL}/item/${cartItemId}`, cartItem, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    console.log("Item updated in cart", response.data);
    return response.data;
  } catch (error: any) {
    console.log("error - - -", error.response);
    return rejectWithValue("Failed to update item in cart");
  }
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    resetCartState: (state) => {
      state.cart = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch user cart
    builder
      .addCase(fetchUserCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchUserCart.fulfilled,
        (state, action: PayloadAction<Cart>) => {
          state.loading = false;
          state.cart = action.payload;
        }
      )
      .addCase(fetchUserCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // add items to cart
    builder
      .addCase(addItemToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addItemToCart.fulfilled,
        (state, action: PayloadAction<CartItem>) => {
          state.loading = false;
          if (state.cart) {
            state.cart.cartItems.push(action.payload);
          }
        }
      )
      .addCase(addItemToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    //delete cart item
    builder
      .addCase(deleteCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.loading = false;
        if (state.cart) {
          state.cart.cartItems = state.cart.cartItems.filter(
            (item: CartItem) => item.id !== action.meta.arg.cartItemId
          );
          const mrpPrice = sumCartItemMrpPrice(state.cart?.cartItems || []);
          const sellingPrice = sumCartItemSellingPrice(
            state.cart?.cartItems || []
          );
          state.cart.totalMrpPrice = mrpPrice;
          state.cart.totalSellingPrice = sellingPrice;
        }
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

      //Update cart
      builder
      .addCase(updateCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        if (state.cart) {
            const index = state.cart.cartItems.findIndex((item: CartItem) => item.id === action.meta.arg.cartItemId);
            if(index !== -1){
                state.cart.cartItems[index]={
                    ...state.cart.cartItems[index],
                    ...action.payload,
                };
            }
            const mrpPrice = sumCartItemMrpPrice(state.cart?.cartItems || []);
            const sellingPrice = sumCartItemSellingPrice(state.cart?.cartItems || []);
            state.cart.totalMrpPrice = mrpPrice;
            state.cart.totalSellingPrice = sellingPrice;   
        }
        state.loading = false;
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

      //apply coupon
      builder.addCase(applyCoupon.fulfilled, (state,action) => {
          state.loading = false;
          state.cart = action.payload;
      })
  },
});

export default cartSlice.reducer;
export const { resetCartState } = cartSlice.actions;

// export const selectCart = (state: RootState) => state.cart.cart;
// export const selectCartLoading = (state: RootState) => state.cart.loading;
// export const selectCartError = (state: RootState) => state.cart.error;
