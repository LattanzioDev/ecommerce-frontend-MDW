import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/slices/productsSlice';
import { addToCart } from '../redux/slices/cartSlice'; //

const Home = () => {
    const dispatch = useDispatch();
    const { products, loading } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    return (
        <div className="home-container">
            <h1>Nuestra Tienda</h1>
            <p className="subtitle">Los mejores productos al mejor precio</p>

            {loading ? (
                <p style={{ textAlign: 'center', fontSize: '1.2rem' }}>Cargando productos...</p>
            ) : products.length === 0 ? (
                <p style={{ textAlign: 'center', fontSize: '1.2rem', color: '#636e72' }}>
                    No hay productos aún. ¡Sé el primero en agregar uno desde el Panel!
                </p>
            ) : (
                <div className="products-grid">
                    {products.map((product) => (
                        <div key={product._id} className="product-card-home" style={{ position: 'relative'}}>
                            {product.image ? (
                                <img src={product.image} alt={product.name} />
                            ) : (
                                <div className="placeholder-image">Sin imagen</div>
                            )}
                            <div className="product-info">
                                <h3>{product.name}</h3>
                                <p className="price">${parseFloat(product.price).toFixed(2)}</p>
                                <p className="description">{product.description}</p>
                            </div>

                            <button
                                onClick={() => dispatch(addToCart(product))}
                                className="btn-add-to-cart"
                            >
                                Agregar al carrito
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;