// src/redux/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser, logoutUser, getUser } from "../thunks/authThunks.js";

const initialState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    successRegister: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {}, // no necesitamos reducers manuales ahora
    extraReducers: (builder) => {
        builder

            // LOGIN
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state) => {
                state.loading = false;
                state.isAuthenticated = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.isAuthenticated = false;
            })

            // OBTENER USER (si cookie válida)
            .addCase(getUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(getUser.rejected, (state) => {
                state.loading = false;
                state.user = null;
                state.isAuthenticated = false;
            })

            // LOGOUT
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.isAuthenticated = false;
            })

            // REGISTER
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.loading = false;
                state.successRegister = true;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.successRegister = false;
            })
    },
});

export default authSlice.reducer;