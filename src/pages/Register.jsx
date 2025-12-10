import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, getUser } from "../redux/thunks/authThunks.js";
import { useNavigate, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { registerSchema } from '../utils/validators';
import toast from 'react-hot-toast';

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, error, isAuthenticated, user } = useSelector((state) => state.auth);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: joiResolver(registerSchema),
    });

    useEffect(() => {
        if (isAuthenticated && user) {
            if (user.admin) {
                navigate('/dashboard');
            } else {
                navigate('/');
            }
        }
    }, [isAuthenticated, user, navigate]);

    const onSubmit = async (data) => {
        try {
            await dispatch(registerUser(data)).unwrap();
            const userData = await dispatch(getUser()).unwrap();

            toast.success('¡Cuenta creada con éxito!');

            if (userData.admin) {
                navigate('/dashboard');
            } else {
                navigate('/');
            }
        } catch (err) {
            toast.error(err || 'Error al crear la cuenta');
        }
    };

    return (
        <div className="form-container">
            <h2>Crear cuenta</h2>
            <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <input
                    type="text"
                    placeholder="Nombre completo"
                    {...register('name')}
                />
                {errors.name && <p className="error">{errors.name.message}</p>}

                <input
                    type="email"
                    placeholder="Email"
                    {...register('email')}
                />
                {errors.email && <p className="error">{errors.email.message}</p>}

                <input
                    type="password"
                    placeholder="Contraseña (mín. 6 caracteres)"
                    {...register('password')}
                />
                {errors.password && <p className="error">{errors.password.message}</p>}

                {error && <p className="error" style={{ textAlign: 'center', fontWeight: 'bold' }}>{error}</p>}

                <button type="submit" className="primary" disabled={isLoading}>
                    {isLoading ? 'Creando cuenta...' : 'Registrarme'}
                </button>
            </form>

            <p style={{ textAlign: 'center', marginTop: '1.5rem', color: '#636e72' }}>
                ¿Ya tenés cuenta? <Link to="/login" style={{ color: '#00cec9', fontWeight: '600' }}>Iniciar sesión</Link>
            </p>
        </div>
    );
};

export default Register;