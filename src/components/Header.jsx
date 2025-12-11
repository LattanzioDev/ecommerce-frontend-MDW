import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {useEffect} from "react";
import {getCart} from "../redux/thunks/cartThunks.js";
import { ShoppingCart } from "lucide-react";
import { logoutUser } from "../redux/thunks/authThunks.js";
import {clearCartState} from "../redux/slices/cartSlice.js";

const Header = () => {
    const { user, isAuthenticated } = useSelector((state) => state.auth);
    const { items = [], loading, error } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getCart());
    }, [dispatch]);
    useEffect(() => {
        if (user) {
            dispatch(getCart());
        }
    }, [dispatch, user]); // ⬅ HACÉ QUE DEPENDA DE user

    let totalItems = loading
        ? 0
        : items.reduce((sum, item) => sum + (item.quantity || 0), 0);

    const handleLogout = () => {
        dispatch(logoutUser());
        dispatch(clearCartState());
        navigate('/');
    };

    if (!isAuthenticated) {
        return (
            <header>
                <nav>
                    <Link to="/" className="logo">M.O'H E-Shop</Link>
                    <div className="nav-right">
                        <Link to="/">Inicio</Link>
                        <Link to="/login">Ingresar</Link>
                        <Link to="/register">Registrarse</Link>
                    </div>
                </nav>
            </header>
        );
    }

    return (
        <header>
            <nav>
                <Link to="/" className="logo">M.O'H E-Shop</Link>

                <div className="nav-right">
                    <Link to="/">Inicio</Link>
                    {user?.admin && <Link to="/dashboard">Panel</Link>}

                    <Link to="/carrito" className="cart-left-icon">
                        <ShoppingCart size={28} strokeWidth={2.5} />
                        {totalItems > 0 && (
                            <span className="cart-left-count">{totalItems}</span>
                        )}
                    </Link>

                    <span className="user-greeting">
                        Hola, {user?.name?.split(' ')[0] || 'Usuario'}
                        {user?.admin && ' (Admin)'}
                    </span>
                    <button onClick={handleLogout} className="btn-logout">Salir</button>
                </div>
            </nav>
        </header>
    );
};

export default Header;