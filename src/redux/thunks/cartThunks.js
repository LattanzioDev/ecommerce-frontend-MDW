import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api.js";

// Obtener carrito
export const getCart = createAsyncThunk(
    "cart/get",
    async (_, thunkAPI) => {
        try {
            const response = await api.get("/cart");
            return response.data;
        } catch (error) {
            const message = error.response?.data?.message || "Error al obtener el carrito";
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Agregar producto al carrito
export const addToCart = createAsyncThunk(
    "cart/add",
    async ({ id, quantity }, thunkAPI) => {
        try {
            const response = await api.post("/cart/add", {
                productId: id,      // ⬅️ El backend pide productId, no id
                quantity: quantity
            });
            return response.data;
        } catch (error) {
            const message = error.response?.data?.message || "Error al agregar el producto";
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Actualizar cantidad en el carrito
export const updateCart = createAsyncThunk(
    "cart/update",
    async ({ id, quantity }, thunkAPI) => {
        try {
            const response = await api.put("/cart/update", {
                productId: id,      // ⬅️ Igual que addToCart
                quantity: quantity
            });
            return response.data;
        } catch (error) {
            const message = error.response?.data?.message || "Error al actualizar el carrito";
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Eliminar un producto del carrito
export const removeFromCart = createAsyncThunk(
    "cart/remove",
    async (id, thunkAPI) => {
        try {
            const response = await api.delete(`/cart/remove/${id}`);
            return response.data;
        } catch (error) {
            const message = error.response?.data?.message || "Error al eliminar el producto del carrito";
            return thunkAPI.rejectWithValue(message);
        }
    }
);