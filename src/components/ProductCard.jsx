const ProductCard = ({ product }) => (
  <div style={{ border: '1px solid #ccc', padding: '1rem', margin: '1rem', flex: '1 1 200px' }}>
    <h3>{product.name}</h3>
    <p>${product.price}</p>
    <p>{product.description}</p>
  </div>
);

export default ProductCard;

