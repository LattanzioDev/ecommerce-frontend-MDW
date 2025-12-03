import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { loginSchema } from '../utils/validators';

const Login = () => {
  const { isLoading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: joiResolver(loginSchema) });

  const onSubmit = async (data) => {
    try {
      await dispatch(login(data)).unwrap();
      navigate('/dashboard');
    } catch (err) {
      // Error ya en state
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', maxWidth: '300px' }}>
      <input {...register('email')} placeholder="Email" />
      {errors.email && <p>{errors.email.message}</p>}
      <input type="password" {...register('password')} placeholder="Password" />
      {errors.password && <p>{errors.password.message}</p>}
      {error && <p>{error}</p>}
      <button type="submit" disabled={isLoading}>Login</button>
    </form>
  );
};

export default Login;