import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, addProduct, editProduct, removeProduct } from '../redux/slices/productsSlice';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { productSchema } from '../utils/validators';
import ProductCard from '../components/ProductCard';
import Modal from '../components/Modal';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.auth);
  const [editingId, setEditingId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { register, handleSubmit, reset } = useForm({ resolver: joiResolver(productSchema) });

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const onSubmit = async (data) => {
    if (editingId) {
      await dispatch(editProduct({ id: editingId, product: data })).unwrap();
      setEditingId(null);
    } else {
      await dispatch(addProduct(data)).unwrap();
    }
    reset();
  };

  const handleDelete = (id) => {
    setSelectedProduct(products.find(p => p._id === id));
    setShowModal(true);
  };

  const confirmDelete = async () => {
    await dispatch(removeProduct(selectedProduct._id)).unwrap();
    setShowModal(false);
  };

  if (!user) return <p>Acceso denegado</p>; // O redirigir

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('name')} placeholder="Nombre" />
        <input type="number" {...register('price')} placeholder="Precio" />
        <textarea {...register('description')} placeholder="Descripción"></textarea>
        <button type="submit">{editingId ? 'Actualizar' : 'Crear'}</button>
      </form>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {products.map((product) => (
          <div key={product._id} style={{ position: 'relative' }}>
            <ProductCard product={product} />
            <button onClick={() => { setEditingId(product._id); /* set form data */ }}>Editar</button>
            <button onClick={() => handleDelete(product._id)}>Eliminar</button>
          </div>
        ))}
      </div>
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={confirmDelete}
        title="Confirmar eliminación"
        message={`¿Eliminar ${selectedProduct?.name}?`}
      />
    </div>
  );
};

export default Dashboard;