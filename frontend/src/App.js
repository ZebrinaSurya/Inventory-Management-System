import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_BASE_URL = "http://localhost:8080/api/products";

function App() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    quantity: '',
    price: '',
    reorderLevel: ''
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${API_BASE_URL}/${editingId}`, formData);
        setEditingId(null);
      } else {
        await axios.post(API_BASE_URL, formData);
      }
      setFormData({ name: '', category: '', quantity: '', price: '', reorderLevel: '' });
      fetchProducts();
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setFormData(product);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`${API_BASE_URL}/${id}`);
        fetchProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({ name: '', category: '', quantity: '', price: '', reorderLevel: '' });
  };

  return (
    <div className="container">
      <header className="header">
        <h1>My Inventory Management System</h1>
      </header>

      <div className="layout">
        <div className="card form-card">
          <h2>{editingId ? "Edit Item" : "Add New Item"}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Item Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label>Category</label>
              <input type="text" name="category" value={formData.category} onChange={handleInputChange} required />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Quantity</label>
                <input type="number" name="quantity" value={formData.quantity} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Price ($)</label>
                <input type="number" step="0.01" name="price" value={formData.price} onChange={handleInputChange} required />
              </div>
            </div>
            <div className="form-group">
              <label>Reorder Threshold</label>
              <input type="number" name="reorderLevel" value={formData.reorderLevel} onChange={handleInputChange} required />
            </div>
            <div className="button-group">
              <button type="submit" className="btn btn-primary">{editingId ? "Update" : "Add Product"}</button>
              {editingId && <button type="button" onClick={resetForm} className="btn btn-secondary">Cancel</button>}
            </div>
          </form>
        </div>

        <div className="card table-card">
          <h2>Current Stock</h2>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr><td colSpan="7" className="text-center">No inventory found.</td></tr>
              ) : (
                products.map((p) => {
                  const isLowStock = p.quantity <= p.reorderLevel;
                  return (
                    <tr key={p.id}>
                      <td>#{p.id}</td>
                      <td><strong>{p.name}</strong></td>
                      <td>{p.category}</td>
                      <td>${Number(p.price).toFixed(2)}</td>
                      <td>{p.quantity}</td>
                      <td>
                        <span className={`badge ${isLowStock ? "badge-danger" : "badge-success"}`}>
                          {isLowStock ? "Low Stock" : "In Stock"}
                        </span>
                      </td>
                      <td>
                        <button onClick={() => handleEdit(p)} className="btn-icon">✏️ Edit</button>
                        <button onClick={() => handleDelete(p.id)} className="btn-icon btn-delete">🗑️ Delete</button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
