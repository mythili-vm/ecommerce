import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Transaction } from "../../types/transaction";
import { api } from "../../config/Api";

interface TransactionState {
  transactions: Transaction[];
  transaction: Transaction | null;
  loading: boolean;
  error: string | null;
}

//Initial state
const initialState: TransactionState = {
  transactions: [],
  transaction: null,
  loading: false,
  error: null,
};

//Thunks
export const fetchTransactionsBySeller = createAsyncThunk<
  Transaction[],
  string,
  { rejectValue: string }
>(
  "transactions/fetchTransactionsBySeller",
  async (jwt, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/transactions/seller`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      console.log("Transactions fetched", response.data);
      return response.data;
    } catch (error: any) {
      console.log("error - - -", error.response);
      return rejectWithValue(
        error.response.data.message || "Failed to fetch transactions"
      );
    }
  }
);

export const fetchAllTransactions = createAsyncThunk<
  Transaction[],
  void,
  { rejectValue: string }
>("transactions/fetchAllTransactions", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get(`/api/transactions`);
    console.log("Transactions fetched", response.data);
    return response.data;
  } catch (error: any) {
    console.log("error - - -", error.response);
    return rejectWithValue(
      error.response.data.message || "Failed to fetch transactions"
    );
  }
});

//Slice
const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactionsBySeller.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactionsBySeller.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchTransactionsBySeller.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(fetchAllTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchAllTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default transactionSlice.reducer;
