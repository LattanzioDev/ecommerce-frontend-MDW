import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser, registerUser, fetchCurrentUser} from '../../services/authService';

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await loginUser(credentials);
      return response.data;
    } catch (err) {
      const message = err.response?.data?.message || 'Error al iniciar sesión';
      return rejectWithValue(message);
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await registerUser(userData);
      return response.data;
    } catch (err) {
      const message = err.response?.data?.message || 'Error al crear cuenta';
      return rejectWithValue(message);
    }
  }
);

export const getMe = createAsyncThunk(
    "auth/getMe",
    async (_, { rejectWithValue }) => {
        try {
            const res = await fetchCurrentUser();
            return res.data.user;
        } catch (err) {
            return rejectWithValue(null);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
//        token: localStorage.getItem('accessToken') || null,
        isLoading: false,
        error: null,
        initialized: false,
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem('token');
        },
        clearError: (state) => {
            state.error = null;
        },
    },

    extraReducers: (builder) => {
        builder
            // LOGIN
            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // REGISTER
            .addCase(register.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                //localStorage.setItem('token', action.payload.token);
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // GET ME
            .addCase(getMe.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getMe.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user; // viene user directo
            })
            .addCase(getMe.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;

                // si falla el ME, se borra sesión
                state.user = null;
                state.token = null;
                localStorage.removeItem('token');
            });
    },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;