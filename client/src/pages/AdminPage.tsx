import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import {
  fetchProducts,
  addProduct,
  deleteProduct,
} from '../components/productsAPI.tsx';
import type { Product } from '../components/productsAPI.tsx';
import toast from 'react-hot-toast';
import './AdminPage.css';

const AdminPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    price: '',
    image: '',
  });

  const loadProducts = async () => {
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAdd = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const newProduct = {
        brand: formData.brand,
        model: formData.model,
        price: parseFloat(formData.price),
        image: formData.image,
      };
      await addProduct(newProduct);
      toast.success('Product added successfully!');
      setFormData({ brand: '', model: '', price: '', image: '' });
      loadProducts();
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('Failed to add product.');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteProduct(id);
      toast.success('Product deleted successfully!');
      loadProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product.');
    }
  };

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId !== 'admin') {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="admin-page">
      <h1>Admin Page</h1>
      <form onSubmit={handleAdd} className="add-form">
        <input
          type="text"
          name="brand"
          placeholder="Brand"
          value={formData.brand}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="model"
          placeholder="Model"
          value={formData.model}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleInputChange}
          required
        />
        <input
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleInputChange}
        />
        <button type="submit">Add Product</button>
      </form>

      <ul className="product-list">
        {products.map((product) => (
          <li key={product.id} className="product-item">
            <img
              src={product.image}
              alt={`${product.brand} ${product.model}`}
            />
            <div>
              <h3>{`${product.brand} ${product.model}`}</h3>
              <p>Price: {product.price} kr</p>
              <button
                id="delete-button"
                onClick={() => handleDelete(product.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default AdminPage;
