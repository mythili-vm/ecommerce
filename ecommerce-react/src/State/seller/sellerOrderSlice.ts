import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Order, OrderStatus } from "../../types/orderTypes";
import { api } from "../../config/Api";

interface SellerOrderState {
  orders: Order[];
  loading: boolean;
  error: string | null;
}

const initialState: SellerOrderState = {
  orders: [],
  loading: false,
  error: null,
};

export const fetchSellerOrders = createAsyncThunk<Order[], string>(
  "seller/fetchSellerOrders",
  async (jwt, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/seller/orders`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      console.log("Seller orders fetched", response.data);
      return response.data;
    } catch (error: any) {
      console.log("error - - -", error.response);
      return rejectWithValue(
        error.response.data.message || "Failed to fetch seller orders"
      );
    }
  }
);

export const updateOrderStatus = createAsyncThunk<
  Order,
  {
    jwt: string;
    orderId: number;
    orderStatus: OrderStatus;
  }
>(
  "seller/updateOrderStatus",
  async ({ jwt, orderId, orderStatus }, { rejectWithValue }) => {
    try {
      const response = await api.patch(
        `/api/seller/orders/${orderId}/status/${orderStatus}`,
        null,
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      );
      console.log("Order status updated", response.data);
      return response.data;
    } catch (error: any) {
      console.log("error - - -", error.response);
      return rejectWithValue(
        error.response.data.message || "Failed to update order status"
      );
    }
  }
);

export const deleletOrder = createAsyncThunk<
  any,
  {
    jwt: string;
    orderId: number;
  }
>("seller/deleteOrder", async ({ jwt, orderId }, { rejectWithValue }) => {
  try {
    const response = await api.delete(`/api/seller/orders/${orderId}/delete`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    console.log("Order deleted", response.data);
    return response.data;
  } catch (error: any) {
    console.log("error - - -", error.response);
    return rejectWithValue(
      error.response.data.message || "Failed to delete order"
    );
  }
});

const sellerOrderSlice = createSlice({
  name: "sellerOrder",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSellerOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchSellerOrders.fulfilled,
        (state, action: PayloadAction<Order[]>) => {
          state.loading = false;
          state.orders = action.payload;
        }
      )
      .addCase(fetchSellerOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateOrderStatus.fulfilled,
        (state, action: PayloadAction<Order>) => {
          state.loading = false;
          const index = state.orders.findIndex(
            (order) => order.id === action.payload.id
          );
          if (index !== -1) {
            state.orders[index] = action.payload;
          }
        }
      )
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(deleletOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleletOrder.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.orders = state.orders.filter(
          (order) => order.id !== action.payload.orderId
        );
      })
      .addCase(deleletOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default sellerOrderSlice.reducer;