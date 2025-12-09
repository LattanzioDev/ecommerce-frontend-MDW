import {createAsyncThunk} from "@reduxjs/toolkit";
import api from "../../services/api.js"


export const loginUser = createAsyncThunk(
    "auth/login",
    async (credentials, thunkAPI) => {
        try {
            await api.post("/auth/login", credentials);
            return true;
        } catch (error) {
            const message = error.response.data.message || "Error al iniciar sesion";
            return thunkAPI.rejectWithValue(message);
        }
    }
)

export const registerUser = createAsyncThunk(
    "auth/register",
    async (credentials, thunkAPI) => {
        try {
            await api.post("/auth/register", credentials);
            return true; // backend creó la cuenta correctamente
        } catch (error) {
            const message =
                error.response?.data?.message || "Error al crear cuenta";
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const getUser = createAsyncThunk(
    "auth/getUser",
    async (_, thunkAPI) => {
        try {
            const response = await api.get("/auth/me", {
                withCredentials: true,
                validateStatus: (status) => status < 401
            });
            return response.data; // Datos del usuario
        } catch (error) {
            const message = error.response.data.message || "No autenticado";
            return thunkAPI.rejectWithValue(message);
        }
    }
)

export const logoutUser = createAsyncThunk(
    "auth/logout",
    async (_, thunkAPI) => {
        try {
            await api.post("/auth/logout");
            return true;
        } catch (error) {
            const message = error.response?.data?.message || "Error al cerrar sesion";
            return thunkAPI.rejectWithValue(message);
        }
    }
)