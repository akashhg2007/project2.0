import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Search, Filter, Image as ImageIcon, CheckCircle2, XCircle } from 'lucide-react';
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

            if (res.ok) {
                fetchProducts();
            }
        } catch (err) {
            console.error('Delete error:', err);
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
        <div style={{ color: 'white' }}>
            <style>{`
                .admin-table {
                    width: 100%;
                    border-collapse: separate;
                    border-spacing: 0 10px;
                }
                .admin-table th {
                    color: #6B7280;
                    text-transform: uppercase;
                    font-size: 0.75rem;
                    font-weight: 700;
                    letter-spacing: 1px;
                    padding: 0 1.5rem 1rem 1.5rem;
                }
                .table-row {
                    background: rgba(255, 255, 255, 0.02);
                    transition: all 0.3s ease;
                }
                .table-row:hover {
                    background: rgba(255, 255, 255, 0.05);
                    transform: scale(1.005);
                }
                .table-row td {
                    padding: 1.25rem 1.5rem;
                }
                .table-row td:first-child { border-radius: 16px 0 0 16px; }
                .table-row td:last-child { border-radius: 0 16px 16px 0; }

                .input-field-dark {
                    width: 100%;
                    padding: 0.8rem 1rem;
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 12px;
                    color: white;
                    font-size: 1rem;
                    transition: all 0.2s;
                    box-sizing: border-box;
                }
                .input-field-dark:focus {
                    outline: none;
                    border-color: #E23744;
                    background: rgba(226, 55, 68, 0.05);
                }
                .modal-overlay {
                    position: fixed;
                    top: 0; left: 0; right: 0; bottom: 0;
                    background: rgba(0, 0, 0, 0.8);
                    backdrop-filter: blur(8px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                    padding: 2rem;
                }
                .action-btn {
                    padding: 0.5rem;
                    border-radius: 8px;
                    border: 1px solid rgba(255,255,255,0.05);
                    background: transparent;
                    color: #9CA3AF;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .action-btn:hover {
                    color: white;
                    background: rgba(255,255,255,0.1);
                }
                .action-btn.delete:hover {
                    color: #F87171;
                    background: rgba(248, 113, 113, 0.1);
                }
            `}</style>

            {/* Header Action Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: 0, letterSpacing: '-1px' }}>Menu Management</h1>
                    <p style={{ color: '#6B7280', margin: '4px 0 0 0' }}>Manage items, prices, and availability</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    style={{
                        background: '#E23744',
                        color: 'white',
                        padding: '0.8rem 1.5rem',
                        borderRadius: '12px',
                        border: 'none',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        boxShadow: '0 8px 20px rgba(226, 55, 68, 0.3)'
                    }}
                >
                    <Plus size={20} /> Add New Item
                </button>
            </div>

            {/* Table Area */}
            <div style={{ overflowX: 'auto' }}>
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th style={{ textAlign: 'left' }}>Item Details</th>
                            <th style={{ textAlign: 'left' }}>Category</th>
                            <th style={{ textAlign: 'left' }}>Price</th>
                            <th style={{ textAlign: 'left' }}>Status</th>
                            <th style={{ textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product._id} className="table-row">
                                <td>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                        <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', overflow: 'hidden' }}>
                                            {product.image ? (
                                                <img src={product.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            ) : (
                                                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#374151' }}>
                                                    <ImageIcon size={20} />
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: 700, fontSize: '1rem' }}>{product.name}</div>
                                            <div style={{ fontSize: '0.8rem', color: '#6B7280', marginTop: '2px' }}>{product.category}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>{product.category}</td>
                                <td style={{ fontWeight: 800, fontSize: '1.1rem' }}>₹{product.price}</td>
                                <td>
                                    <div style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        color: product.isAvailable ? '#22C55E' : '#9CA3AF',
                                        fontSize: '0.9rem',
                                        fontWeight: 600
                                    }}>
                                        {product.isAvailable ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                                        {product.isAvailable ? 'Live' : 'Hidden'}
                                    </div>
                                </td>
                                <td style={{ textAlign: 'right' }}>
                                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                                        <button className="action-btn" onClick={() => handleOpenModal(product)} title="Edit"><Edit2 size={18} /></button>
                                        <button className="action-btn delete" onClick={() => handleDelete(product._id)} title="Delete"><Trash2 size={18} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="glass-card" style={{ width: '100%', maxWidth: '550px', padding: '2.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>{editingProduct ? 'Edit Menu Item' : 'New Menu Item'}</h2>
                            <button onClick={() => setIsModalOpen(false)} style={{ background: 'transparent', border: 'none', color: '#6B7280', cursor: 'pointer' }}><XCircle size={24} /></button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#6B7280', marginBottom: '8px', textTransform: 'uppercase' }}>Item Name</label>
                                <input required className="input-field-dark" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="e.g. Spicy Paneer Roll" />
                            </div>

                            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                                <div style={{ flex: 1 }}>
                                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#6B7280', marginBottom: '8px', textTransform: 'uppercase' }}>Price (₹)</label>
                                    <input required type="number" className="input-field-dark" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} placeholder="99" />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#6B7280', marginBottom: '8px', textTransform: 'uppercase' }}>Category</label>
                                    <select className="input-field-dark" style={{ appearance: 'none' }} value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })}>
                                        <option>Snacks</option>
                                        <option>Meals</option>
                                        <option>Beverages</option>
                                        <option>Combos</option>
                                        <option>Desserts</option>
                                    </select>
                                </div>
                            </div>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#6B7280', marginBottom: '8px', textTransform: 'uppercase' }}>Description</label>
                                <textarea className="input-field-dark" rows="3" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} placeholder="What's inside this delicious dish?" />
                            </div>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#6B7280', marginBottom: '8px', textTransform: 'uppercase' }}>Image Source URL</label>
                                <input className="input-field-dark" value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} placeholder="https://images..." />
                            </div>

                            <div style={{ marginBottom: '2.5rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <input
                                    type="checkbox"
                                    id="available"
                                    checked={formData.isAvailable}
                                    onChange={e => setFormData({ ...formData, isAvailable: e.target.checked })}
                                    style={{ width: '20px', height: '20px', accentColor: '#E23744', cursor: 'pointer' }}
                                />
                                <label htmlFor="available" style={{ cursor: 'pointer', fontWeight: 600 }}>Available for order</label>
                            </div>

                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <button type="button" onClick={() => setIsModalOpen(false)} style={{ flex: 1, padding: '1rem', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', color: 'white', border: 'none', fontWeight: 700, cursor: 'pointer' }}>Discard</button>
                                <button type="submit" disabled={loading} style={{
                                    flex: 2,
                                    padding: '1rem',
                                    borderRadius: '12px',
                                    background: '#E23744',
                                    color: 'white',
                                    border: 'none',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    boxShadow: '0 8px 20px rgba(226, 55, 68, 0.3)'
                                }}>
                                    {loading ? 'Processing...' : (editingProduct ? 'Commit Changes' : 'Publish Item')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageMenu;
