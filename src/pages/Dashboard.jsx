import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, addProduct, editProduct, removeProduct } from '../redux/slices/productsSlice';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { productSchema } from '../utils/validators';
import toast from 'react-hot-toast';

const Dashboard = () => {
    const dispatch = useDispatch();
    const { products, loading } = useSelector((state) => state.products);
    const [editingId, setEditingId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const { register, handleSubmit, reset, setValue } = useForm({
        resolver: joiResolver(productSchema),
    });

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const onSubmit = async (data) => {
        try {
            if (editingId) {
                await dispatch(editProduct({ id: editingId, product: data })).unwrap();
                toast.success('Producto actualizado');
                setEditingId(null);
            } else {
                await dispatch(addProduct(data)).unwrap();
                toast.success('Producto agregado con éxito');
            }
            reset();
        } catch (err) {
            toast.error('Error al guardar producto');
        }
    };

    const handleEdit = (product) => {
        setEditingId(product._id);
        setValue('name', product.name);
        setValue('price', product.price);
        setValue('description', product.description);
        setValue('image', product.image || '');
    };

    const handleDelete = () => {
        dispatch(removeProduct(deleteId));
        toast.success('Producto eliminado');
        setShowModal(false);
    };

    return (
        <div className="dashboard-container">
            <h1>Panel de Administrador</h1>

            <div className="form-card">
                <h2>{editingId ? 'Editar Producto' : 'Crear Nuevo Producto'}</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input {...register('name')} placeholder="Nombre del producto" />
                    <input {...register('price')} type="number" step="0.01" placeholder="Precio ($)" />
                    <input {...register('image')} placeholder="URL de la imagen (ej: https://i.imgur.com/...)" />
                    <textarea {...register('description')} rows="3" placeholder="Descripción detallada"></textarea>
                    <div className="form-actions">
                        <button type="submit" className="btn-primary">
                            {editingId ? 'Actualizar' : 'Crear Producto'}
                        </button>
                        {editingId && (
                            <button type="button" onClick={() => { setEditingId(null); reset(); }} className="btn-primary btn-cancel">
                                Cancelar
                            </button>
                        )}
                    </div>
                </form>
            </div>

            <div className="products-grid">
                {loading ? <p>Cargando productos...</p> : null}
                {products.map((product) => (
                    <div key={product._id} className="product-card-admin">
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
                        <div className="product-actions">
                            <button onClick={() => handleEdit(product)} className="btn-edit">
                                Editar
                            </button>
                            <button onClick={() => { setDeleteId(product._id); setShowModal(true); }} className="btn-delete">
                                Eliminar
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {showModal && (
                <div className="modal-backdrop">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>¿Eliminar producto?</h3>
                            <p>Esta acción no se puede deshacer</p>
                        </div>
                        <div className="modal-footer">
                            <button
                                onClick={handleDelete}
                                className="btn-delete-modal"
                            >
                                Sí, eliminar
                            </button>
                            <button
                                onClick={() => setShowModal(false)}
                                className="btn-cancel-modal"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;