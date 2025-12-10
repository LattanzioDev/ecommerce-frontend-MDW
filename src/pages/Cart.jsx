import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../redux/slices/cartSlice';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus } from "lucide-react"; // iconos modernos

const Cart = () => {
    const { items = [] } = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const total = items
        .reduce((sum, item) => sum + item.price * item.quantity, 0)
        .toFixed(2);

    if (items.length === 0) {
        return (
            <div className="cart-empty">
                <h2>Tu carrito está vacío</h2>
                <Link to="/" className="btn-primary">Seguir comprando</Link>
            </div>
        );
    }

    return (
        <div className="cart-container">
            <div className="cart-left">
                <h2>Carrito</h2>

                {items.map((item) => (
                    <div key={item._id} className="cart-item">
                        <img src={item.image || '/placeholder.jpg'} alt={item.name} />

                        <div className="cart-info">
                            <h3>{item.name}</h3>
                            <p className="unit-price">${item.price.toFixed(2)}</p>

                            <div className="cart-qty">
                                <button
                                    onClick={() =>
                                        dispatch(updateQuantity({ id: item._id, quantity: Math.max(1, item.quantity - 1) }))
                                    }
                                >
                                    <Minus size={16} />
                                </button>

                                <span>{item.quantity}</span>

                                <button
                                    onClick={() =>
                                        dispatch(updateQuantity({ id: item._id, quantity: item.quantity + 1 }))
                                    }
                                >
                                    <Plus size={16} />
                                </button>
                            </div>
                        </div>

                        <div className="cart-right">
                            <p className="subtotal">${(item.price * item.quantity).toFixed(2)}</p>
                            <button
                                onClick={() => dispatch(removeFromCart(item._id))}
                                className="remove-btn"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="cart-summary">
                <h2>Resumen</h2>

                <div className="summary-row">
                    <span>Total productos</span>
                    <span>${total}</span>
                </div>

                <button className="btn-checkout">Finalizar compra</button>

                <Link to="/" className="btn-back">
                    Seguir comprando
                </Link>
            </div>
        </div>
    );
};

export default Cart;
