import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../../services/productsService';

export const fetchProducts = createAsyncThunk('products/fetch', async () => {
  const response = await getProducts();
  return response.data;
});

export const addProduct = createAsyncThunk('products/add', async (product) => {
  const response = await createProduct(product);
  return response.data;
});

export const editProduct = createAsyncThunk('products/edit', async ({ id, product }) => {
  const response = await updateProduct(id, product);
  return response.data;
});

export const removeProduct = createAsyncThunk('products/remove', async (id) => {
  await deleteProduct(id);
  return id;
});

const productsSlice = createSlice({
  name: 'products',
  initialState: { products: [], isLoading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.isLoading = false;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(p => p._id === action.payload._id);
        state.products[index] = action.payload;
      })
      .addCase(removeProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(p => p._id !== action.payload);
      });
  },
});

export default productsSlice.reducer;