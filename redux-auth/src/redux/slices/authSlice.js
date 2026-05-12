import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";

const storedUser = localStorage.getItem("auth_user");
const storedToken = localStorage.getItem("access_token");

export const loginThunk = createAsyncThunk(
    "auth/login",
    async (data, { rejectWithValue }) => {
        try {
            const res = await axiosClient.post("/api/auth/login", data);
            return res;
        } catch (error) {
            return rejectWithValue(error?.message || "Đăng nhập thất bại");
        }
    },
);

export const registerThunk = createAsyncThunk(
    "auth/register",
    async (data, { rejectWithValue }) => {
        try {
            const res = await axiosClient.post("/api/auth/register", data);
            return res;
        } catch (error) {
            return rejectWithValue(error?.message || "Đăng ký thất bại");
        }
    },
);

export const verifyOtpThunk = createAsyncThunk(
    "auth/verify-otp",
    async (data, { rejectWithValue }) => {
        try {
            const res = await axiosClient.post("/api/auth/verify-otp", data);
            return res;
        } catch (error) {
            return rejectWithValue(error?.message || "Xác thực OTP thất bại");
        }
    },
);

export const requestPasswordResetThunk = createAsyncThunk(
    "auth/forgot-password/request-otp",
    async (data, { rejectWithValue }) => {
        try {
            const res = await axiosClient.post(
                "/api/auth/forgot-password/request-otp",
                data,
            );
            return res;
        } catch (error) {
            return rejectWithValue(error?.message || "Không gửi được OTP");
        }
    },
);

export const resetPasswordThunk = createAsyncThunk(
    "auth/forgot-password/reset",
    async (data, { rejectWithValue }) => {
        try {
            const res = await axiosClient.post(
                "/api/auth/forgot-password/reset",
                data,
            );
            return res;
        } catch (error) {
            return rejectWithValue(error?.message || "Đặt lại mật khẩu thất bại");
        }
    },
);

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isAuthenticated: Boolean(storedToken),
        user: storedUser ? JSON.parse(storedUser) : null,
        loading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            localStorage.removeItem("auth_user");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginThunk.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload?.accessToken) {
                    state.isAuthenticated = true;
                    state.user = action.payload.user || null;
                    localStorage.setItem("access_token", action.payload.accessToken);
                    if (action.payload.refreshToken) {
                        localStorage.setItem(
                            "refresh_token",
                            action.payload.refreshToken,
                        );
                    }
                    if (action.payload.user) {
                        localStorage.setItem(
                            "auth_user",
                            JSON.stringify(action.payload.user),
                        );
                    }
                } else {
                    state.error = action.payload?.message || "Đăng nhập thất bại";
                }
            })
            .addCase(loginThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Đã có lỗi xảy ra";
            })
            .addCase(registerThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerThunk.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(registerThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Đăng ký thất bại";
            })
            .addCase(verifyOtpThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(verifyOtpThunk.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(verifyOtpThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Xác thực OTP thất bại";
            })
            .addCase(requestPasswordResetThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(requestPasswordResetThunk.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(requestPasswordResetThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Không gửi được OTP";
            })
            .addCase(resetPasswordThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(resetPasswordThunk.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(resetPasswordThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Đặt lại mật khẩu thất bại";
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
