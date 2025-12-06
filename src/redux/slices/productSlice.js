import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../../services/productsService';

export const fetchProducts = createAsyncThunk('products/fetch', async (_, { rejectWithValue }) => {
    try {
        const response = await getProducts();
        // Maneja si devuelve { products: [...] } o array directo
        return Array.isArray(response.data) ? response.data : response.data.products || [];
    } catch (err) {
        return rejectWithValue(err.response?.data?.message || 'Error al cargar productos');
    }
});

export const addProduct = createAsyncThunk('products/add', async (product, { rejectWithValue }) => {
    try {
        const response = await createProduct(product);
        return response.data.product;  // ← CORREGIDO: extrae .product
    } catch (err) {
        return rejectWithValue(err.response?.data?.message || 'Error al crear producto');
    }
});

export const editProduct = createAsyncThunk('products/edit', async ({ id, product }, { rejectWithValue }) => {
    try {
        const response = await updateProduct(id, product);
        return response.data.product;  // ← CORREGIDO: extrae .product
    } catch (err) {
        return rejectWithValue(err.response?.data?.message || 'Error al editar producto');
    }
});

export const removeProduct = createAsyncThunk('products/remove', async (id, { rejectWithValue }) => {
    try {
        await deleteProduct(id);
        return id;
    } catch (err) {
        return rejectWithValue(err.response?.data?.message || 'Error al eliminar');
    }
});

const productsSlice = createSlice({
    name: 'products',
    initialState: { products: [], isLoading: false, error: null },
    reducers: {
        clearError: (state) => { state.error = null; },
    },
    extraReducers: (builder) => {
        builder
            // FETCH
            .addCase(fetchProducts.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // ADD
            .addCase(addProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products.push(action.payload);
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // EDIT
            .addCase(editProduct.fulfilled, (state, action) => {
                const index = state.products.findIndex(p => p._id === action.payload._id);
                if (index !== -1) {
                    state.products[index] = action.payload;
                }
            })
            .addCase(editProduct.rejected, (state, action) => {
                state.error = action.payload;
            })
            // DELETE
            .addCase(removeProduct.fulfilled, (state, action) => {
                state.products = state.products.filter(p => p._id !== action.payload);
            })
            .addCase(removeProduct.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export const { clearError } = productsSlice.actions;
export default productsSlice.reducer;