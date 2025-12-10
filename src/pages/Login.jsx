import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, loginUser } from "../redux/thunks/authThunks.js";
import { useNavigate, Link } from 'react-router-dom';
import { useEffect } from 'react'; //
import { loginSchema } from '../utils/validators';
import toast from 'react-hot-toast';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, error, isAuthenticated, user } = useSelector((state) => state.auth);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: joiResolver(loginSchema),
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
            await dispatch(loginUser(data)).unwrap();

            const userData = await dispatch(getUser()).unwrap();

            toast.success('¡Bienvenido de nuevo!');

            if (userData.admin) {
                navigate('/dashboard');
            } else {
                navigate('/');
            }

        } catch (err) {
            toast.error(err || 'Email o contraseña incorrectos');
        }
    };

    return (
        <div className="form-container">
            <h2>Iniciar sesión</h2>
            <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <input
                    type="email"
                    placeholder="Email"
                    {...register('email')}
                />
                {errors.email && <p className="error">{errors.email.message}</p>}

                <input
                    type="password"
                    placeholder="Contraseña"
                    {...register('password')}
                />
                {errors.password && <p className="error">{errors.password.message}</p>}

                {error && <p className="error" style={{ textAlign: 'center', fontWeight: 'bold' }}>{error}</p>}

                <button type="submit" className="primary" disabled={isLoading}>
                    {isLoading ? 'Entrando...' : 'Ingresar'}
                </button>
            </form>

            <p style={{ textAlign: 'center', marginTop: '1.5rem', color: '#636e72' }}>
                ¿No tenés cuenta? <Link to="/register" style={{ color: '#00cec9', fontWeight: '600' }}>Registrate acá</Link>
            </p>
        </div>
    );
};

export default Login;