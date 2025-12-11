import { createSlice } from "@reduxjs/toolkit";
import {
    getCart,
    addToCart,
    updateCart,
    removeFromCart
} from "../thunks/cartThunks.js";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
        loading: false,
        error: null
    },
    reducers: {
        clearCartState: (state) => {
            state.items = [];
            state.loading = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder

            // 📌 Get Cart
            .addCase(getCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCart.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.items || action.payload;
            })
            .addCase(getCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // 📌 Add to Cart
            .addCase(addToCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.items || action.payload;
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // 📌 Update Cart
            .addCase(updateCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateCart.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.items || action.payload;
            })
            .addCase(updateCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // 📌 Remove From Cart
            .addCase(removeFromCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.items || action.payload;
            })
            .addCase(removeFromCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});
export const { clearCartState } = cartSlice.actions;
export default cartSlice.reducer;