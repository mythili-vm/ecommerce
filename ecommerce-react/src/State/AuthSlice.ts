import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../config/Api";
import { User } from "../types/userTypes";
import { Seller } from "../types/SellerTypes";
import { persistor } from "./Store";

export const sendLoginSignupOtp = createAsyncThunk(
  "/auth/sendLoginSignupOtp",
  async ({ email }: { email: string }, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/sent/login-signup-otp", { email });
      console.log("login otp", response);
    } catch (e) {
      console.log("error - - -", e);
    }
  }
);

export const signin = createAsyncThunk<any, any>(
  "/auth/signin",
  async (loginRequest, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/sign-in", loginRequest);
      return response.data;
    } catch (e) {
      console.log("error - - -", e);
    }
  }
);

export const fetchUserProfile = createAsyncThunk<any, any>(
  "/api/users/profile",
  async ({ jwt }, { rejectWithValue }) => {
    try {
      const response = await api.get("/users/profile", {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      console.log("user profile", response.data);
      return response.data;
    } catch (e) {
      console.log("error - - -", e);
    }
  }
);

export const signup = createAsyncThunk<any, any>(
  "/auth/signup",
  async (signupRequest, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/signup", signupRequest);
      console.log("signup", response.data);
      return response.data;
    } catch (e) {
      console.log("error - - -", e);
    }
  }
);

export const logout = createAsyncThunk<any, any>(
  "/auth/logout",
  async (navigate, { rejectWithValue }) => {
    try {
      localStorage.removeItem("persist:root");
      localStorage.clear();
      persistor.purge();
      console.log("logout successfully");
      onLogout();
      navigate("/");
    } catch (e) {
      console.log("error - - -", e);
    }
  }
);

export const sellerLogin = createAsyncThunk<any, any>(
  "/seller/signin",
  async (loginRequest, { rejectWithValue }) => {
    try {
      const response = await api.post("/seller/login", loginRequest);
      localStorage.setItem("jwt", response.data.jwt);
      localStorage.setItem("role", response.data.role);
      return response.data;
    } catch (e) {
      console.log("error - - -", e);
    }
  }
);

interface AuthState {
  jwt: string | null;
  otpSent: boolean;
  isLoggedIn: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
  seller: Seller | null;
}

const initialState: AuthState = {
  jwt: null,
  otpSent: false,
  isLoggedIn: false,
  user: null,
  loading: false,
  error: null,
  seller: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    onLogout: (state) => {
      localStorage.clear();
      state.jwt = null;
      state.isLoggedIn = false;
      state.user = null;
      state.seller = null;
      state.otpSent=false;
      state.loading=false;
      state.error=null;
      persistor.purge();
    },
  },
  extraReducers: (builder) => {
    //signup otp
    builder
      .addCase(sendLoginSignupOtp.pending, (state) => {
        state.loading = true;
        state.otpSent = false;
      })
      .addCase(sendLoginSignupOtp.fulfilled, (state) => {
        state.loading = false;
        state.otpSent = true;
      })
      .addCase(sendLoginSignupOtp.rejected, (state, action) => {
        state.loading = false;
        state.otpSent = false;
        state.error = action.payload as string;
      });

    builder.addCase(signin.fulfilled, (state, action) => {
      state.jwt = action.payload;
      state.isLoggedIn = true;
      state.otpSent = false;
      localStorage.setItem("jwt", action.payload.jwt);
      localStorage.setItem("role", action.payload.role);
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      state.user = action.payload;
      state.otpSent = false;
      state.isLoggedIn = false;
    });
    builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", action.payload);
    });
    builder.addCase(logout.fulfilled, (state) => {
      
      state.jwt = null;
      state.isLoggedIn = false;
      state.user = null;
      state.otpSent = false;
      state.loading = false;
    });

    builder
      .addCase(sellerLogin.fulfilled, (state, action) => {
        state.jwt = action.payload;
        state.isLoggedIn = true;
        state.otpSent = false;
        state.loading = false;
      })
      .addCase(sellerLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(sellerLogin.pending, (state) => {
        state.loading = true;
      });
  },
});

const { onLogout } = authSlice.actions;
export default authSlice.reducer;
