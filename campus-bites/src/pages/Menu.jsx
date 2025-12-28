import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';

const Menu = () => {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState('All');
    const { addToCart } = useCart();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // In a real app, fetch from API: fetch('http://localhost:5000/api/products')
        // For now, mocking data if fetch fails (since backend might not be running)
        const fetchProducts = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/products');
                if (!res.ok) throw new Error('Failed to fetch');
                const data = await res.json();
                setProducts(data);
            } catch (err) {
                console.log('Using mock data');
                setProducts([
                    { _id: '1', name: 'Samosa', price: 20, category: 'Snacks', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&auto=format&fit=crop&q=60', description: 'Crispy fried pastry' },
                    { _id: '2', name: 'Vada Pav', price: 25, category: 'Snacks', image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500&auto=format&fit=crop&q=60', description: 'Mumbai favorite' },
                    { _id: '3', name: 'Sandwich', price: 40, category: 'Snacks', image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500&auto=format&fit=crop&q=60', description: 'Grilled vegetable sandwich' },
                    { _id: '4', name: 'Masala Chai', price: 15, category: 'Beverages', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=500&auto=format&fit=crop&q=60', description: 'Spiced Indian tea' }
                ]);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const categories = ['All', 'Snacks', 'Meals', 'Beverages'];
    const filteredProducts = category === 'All' ? products : products.filter(p => p.category === category);

    if (loading) return <div className="text-center mt-6">Loading menu...</div>;

    return (
        <div>
            {/* Category Filter */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setCategory(cat)}
                        style={{
                            padding: '0.5rem 1.25rem',
                            borderRadius: '2rem',
                            border: 'none',
                            backgroundColor: category === cat ? '#EF4444' : 'white',
                            color: category === cat ? 'white' : '#4B5563',
                            boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                            fontWeight: 500,
                            cursor: 'pointer',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Product Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                {filteredProducts.map(product => (
                    <div key={product._id} className="card" style={{ padding: 0, overflow: 'hidden' }}>
                        <img
                            src={product.image}
                            alt={product.name}
                            style={{ width: '100%', height: '160px', objectFit: 'cover' }}
                        />
                        <div style={{ padding: '1rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                                <h3 style={{ fontSize: '1.1rem' }}>{product.name}</h3>
                                <span style={{ backgroundColor: '#FEF3C7', color: '#D97706', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.875rem', fontWeight: 600 }}>
                                    ₹{product.price}
                                </span>
                            </div>
                            <p className="text-gray text-sm" style={{ marginBottom: '1rem', minHeight: '2.5rem' }}>{product.description}</p>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span className="text-sm text-gray" style={{ backgroundColor: '#F3F4F6', padding: '0.25rem 0.75rem', borderRadius: '1rem' }}>{product.category}</span>
                                <button
                                    onClick={() => addToCart(product)}
                                    className="btn btn-primary"
                                    style={{ width: 'auto', padding: '0.5rem 1rem' }}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Menu;
