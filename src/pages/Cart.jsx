import { useSelector, useDispatch } from 'react-redux';
import {useEffect} from "react";
import {removeFromCart, getCart, updateCart} from "../redux/thunks/cartThunks.js";
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus } from "lucide-react"; // iconos modernos

const Cart = () => {
    const dispatch = useDispatch();
    const { items = [], loading, error } = useSelector((state) => state.cart);

    useEffect(() => {
        dispatch(getCart());
    }, [dispatch]);


    // ⬅️ Manejar errores
    if (error) {
        return <p>Error: {error}</p>;
    }

    const total = items
        .reduce((sum, item) => sum + item.product.price * item.quantity, 0)
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
                    <div key={item.product._id} className="cart-item">
                        <img src={item.product.image || '/placeholder.jpg'} alt={item.product.name} />

                        <div className="cart-info">
                            <h3>{item.name}</h3>
                            <p className="unit-price">${item.product.price.toFixed(2)}</p>

                            <div className="cart-qty">
                                <button
                                    onClick={() =>
                                        dispatch(updateCart({ id: item.product._id, quantity: Math.max(1, item.quantity - 1) }))
                                    }
                                >
                                    <Minus size={16} />
                                </button>

                                <span>{item.quantity}</span>

                                <button
                                    onClick={() =>
                                        dispatch(updateCart({ id: item.product._id, quantity: item.quantity + 1 }))
                                    }
                                >
                                    <Plus size={16} />
                                </button>
                            </div>
                        </div>

                        <div className="cart-right">
                            <p className="subtotal">${(item.product.price * item.quantity).toFixed(2)}</p>
                            <button
                                onClick={() => dispatch(removeFromCart(item.product._id))}
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
