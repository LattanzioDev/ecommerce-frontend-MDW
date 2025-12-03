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
        {/* Logo */}
        <Link to="/" className="logo">
          E-Shop
        </Link>

        {/* Enlaces */}
        <div className="nav-links">
          <Link to="/">Inicio</Link>

          {user ? (
            <>
              <Link to="/dashboard">Panel</Link>
              <span style={{ marginLeft: '1rem', fontWeight: '500' }}>
                Hola, {user.name.split(' ')[0]}!
              </span>
              <button onClick={handleLogout}>Salir</button>
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