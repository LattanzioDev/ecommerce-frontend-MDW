import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../redux/slices/authSlice';

const Header = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    return (
        <header>
            <nav>
                <Link to="/" className="logo">M.O'H E-Shop</Link>

                <div className="nav-right">
                    <Link to="/">Inicio</Link>
                    {user && <Link to="/dashboard">Panel</Link>}

                    {user ? (
                        <>
                            <span className="user-greeting">Hola, {user.name.split(' ')[0]}!</span>
                            <button onClick={handleLogout} className="btn-logout">Salir</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login">Ingresar</Link>
                            <Link to="/register">Registrarse</Link>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;