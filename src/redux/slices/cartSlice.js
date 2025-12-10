import { createSlice } from '@reduxjs/toolkit';

const loadCartFromStorage = () => {
    try {
        const cart = localStorage.getItem('cart');
        return cart ? JSON.parse(cart) : [];
    } catch {
        return [];
    }
};

const saveCartToStorage = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: loadCartFromStorage(),
    },
    reducers: {
        addToCart: (state, action) => {
            const product = action.payload;
            const existing = state.items.find(item => item._id === product._id);
            if (existing) {
                existing.quantity += 1;
            } else {
                state.items.push({ ...product, quantity: 1 });
            }
            saveCartToStorage(state.items);
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter(item => item._id !== action.payload);
            saveCartToStorage(state.items);
        },
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const item = state.items.find(item => item._id === id);
            if (item) {
                item.quantity = quantity;
                if (quantity <= 0) {
                    state.items = state.items.filter(item => item._id !== id);
                }
            }
            saveCartToStorage(state.items);
        },
        clearCart: (state) => {
            state.items = [];
            localStorage.removeItem('cart');
        },
    },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;