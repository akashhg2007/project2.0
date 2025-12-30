import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

import API_URL from '../../apiConfig';

const ManageMenu = () => {
    const [products, setProducts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();

    // Form State
    const [formData, setFormData] = useState({
        name: '', price: '', category: 'Snacks', description: '', image: '', isAvailable: true
    });

    const fetchProducts = async () => {
        try {
            const res = await fetch(`${API_URL}/api/products`);
            const data = await res.json();
            setProducts(data);
        } catch (err) {
            console.error('Failed to fetch products');
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleOpenModal = (product = null) => {
        if (product) {
            setEditingProduct(product);
            setFormData(product);
        } else {
            setEditingProduct(null);
            setFormData({ name: '', price: '', category: 'Snacks', description: '', image: '', isAvailable: true });
        }
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this item?')) return;
        try {
            const res = await fetch(`${API_URL}/api/products/${id}`, {
                method: 'DELETE',
                headers: { 'x-user-id': user.id }
            });

            const data = await res.json();

            if (res.ok) {
                alert('Item deleted successfully!');
                fetchProducts();
            } else {
                alert(`Failed to delete: ${data.message || 'Unknown error'}`);
            }
        } catch (err) {
            console.error('Delete error:', err);
            alert('Failed to delete: Network error');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const url = editingProduct
            ? `${API_URL}/api/products/${editingProduct._id}`
            : `${API_URL}/api/products`;

        const method = editingProduct ? 'PUT' : 'POST';

        try {
            await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'x-user-id': user.id
                },
                body: JSON.stringify(formData)
            });
            setIsModalOpen(false);
            fetchProducts();
        } catch (err) {
            alert('Operation failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.8rem' }}>Menu Management</h1>
                <button
                    onClick={() => handleOpenModal()}
                    className="btn btn-primary"
                    style={{ display: 'flex', alignItems: 'center' }}
                >
                    <Plus size={20} style={{ marginRight: '0.5rem' }} /> Add New Item
                </button>
            </div>

            <div className="card" style={{ padding: 0 }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ backgroundColor: '#F9FAFB', borderBottom: '1px solid #E5E7EB' }}>
                        <tr>
                            <th style={{ padding: '1rem', textAlign: 'left' }}>Item</th>
                            <th style={{ padding: '1rem', textAlign: 'left' }}>Category</th>
                            <th style={{ padding: '1rem', textAlign: 'left' }}>Price</th>
                            <th style={{ padding: '1rem', textAlign: 'left' }}>Status</th>
                            <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product._id} style={{ borderBottom: '1px solid #E5E7EB' }}>
                                <td style={{ padding: '1rem', display: 'flex', alignItems: 'center' }}>
                                    <img src={product.image} alt={product.name} style={{ width: '40px', height: '40px', borderRadius: '0.5rem', marginRight: '1rem', objectFit: 'cover' }} />
                                    <div>
                                        <div style={{ fontWeight: 500 }}>{product.name}</div>
                                        <div className="text-sm text-gray" style={{ maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.description}</div>
                                    </div>
                                </td>
                                <td style={{ padding: '1rem' }}>
                                    <span style={{ backgroundColor: '#F3F4F6', padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.875rem' }}>{product.category}</span>
                                </td>
                                <td style={{ padding: '1rem', fontWeight: 600 }}>₹{product.price}</td>
                                <td style={{ padding: '1rem' }}>
                                    <span style={{
                                        backgroundColor: product.isAvailable ? '#D1FAE5' : '#FEE2E2',
                                        color: product.isAvailable ? '#059669' : '#DC2626',
                                        padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.875rem', fontWeight: 500
                                    }}>
                                        {product.isAvailable ? 'Available' : 'Unavailable'}
                                    </span>
                                </td>
                                <td style={{ padding: '1rem', textAlign: 'right' }}>
                                    <button onClick={() => handleOpenModal(product)} style={{ marginRight: '0.5rem', padding: '0.5rem', color: '#4F46E5' }}><Edit2 size={18} /></button>
                                    <button onClick={() => handleDelete(product._id)} style={{ padding: '0.5rem', color: '#DC2626' }}><Trash2 size={18} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                    <div className="card" style={{ width: '500px', maxHeight: '90vh', overflowY: 'auto' }}>
                        <h2 style={{ marginBottom: '1.5rem' }}>{editingProduct ? 'Edit Item' : 'Add New Item'}</h2>
                        <form onSubmit={handleSubmit}>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Item Name</label>
                                <input required className="input-field" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                                <div style={{ flex: 1 }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Price (₹)</label>
                                    <input required type="number" className="input-field" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Category</label>
                                    <select className="input-field" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })}>
                                        <option>Snacks</option>
                                        <option>Meals</option>
                                        <option>Beverages</option>
                                    </select>
                                </div>
                            </div>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Description</label>
                                <textarea className="input-field" rows="3" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
                            </div>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Image URL</label>
                                <input className="input-field" value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} />
                            </div>
                            <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center' }}>
                                <input
                                    type="checkbox"
                                    checked={formData.isAvailable}
                                    onChange={e => setFormData({ ...formData, isAvailable: e.target.checked })}
                                    style={{ width: '20px', height: '20px', marginRight: '0.5rem' }}
                                />
                                <label>Available for order</label>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                                <button type="button" onClick={() => setIsModalOpen(false)} style={{ padding: '0.75rem 1.5rem', borderRadius: '0.5rem', background: '#F3F4F6' }}>Cancel</button>
                                <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: 'auto' }}>{loading ? 'Saving...' : 'Save Item'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageMenu;
