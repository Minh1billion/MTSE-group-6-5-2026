import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";

export const getProfileThunk = createAsyncThunk(
    "user/profile",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axiosClient.get("/api/user/profile");
            return res;
        } catch (error) {
            return rejectWithValue(error?.message || "Không thể lấy thông tin profile");
        }
    },
);

const userSlice = createSlice({
    name: "user",
    initialState: {
        profile: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProfileThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getProfileThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.profile = action.payload?.user || action.payload;
            })
            .addCase(getProfileThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Không thể lấy thông tin profile";
            });
    },
});

export default userSlice.reducer;
