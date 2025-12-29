import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ShoppingCart, Star, Clock, Search, TrendingUp, Sparkles, Filter } from 'lucide-react';

const Menu = () => {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState('All');
    const { addToCart } = useCart();
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products`);
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

    const categories = [
        { name: 'All', emoji: '🍽️' },
        { name: 'Snacks', emoji: '🍔' },
        { name: 'Meals', emoji: '🍛' },
        { name: 'Beverages', emoji: '🥤' }
    ];

    const filteredProducts = category === 'All' ? products : products.filter(p => p.category === category);

    if (loading) return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#9CA3AF'
        }}>
            <Sparkles className="animate-pulse" size={48} color="#E23744" />
        </div>
    );

    return (
        <div style={{ padding: '0 1rem 8rem 1rem' }}>
            {/* Header / Hero */}
            <div style={{ paddingTop: '2rem', marginBottom: '2rem' }}>
                <p style={{ color: '#E23744', fontSize: '0.9rem', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>
                    Campus Bites
                </p>
                <h1 style={{
                    fontSize: '2.5rem',
                    fontWeight: 800,
                    lineHeight: '1.2',
                    marginTop: '0.5rem',
                    background: 'linear-gradient(90deg, #FFF 0%, #A5A5A5 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}>
                    Hungry, {user?.name?.split(' ')[0] || 'Peer'}? 😋
                </h1>

                {/* Search Omni-bar */}
                <div style={{
                    marginTop: '1.5rem',
                    position: 'relative'
                }}>
                    <div className="glass-panel" style={{
                        borderRadius: '20px',
                        padding: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem'
                    }}>
                        <Search color="#9CA3AF" size={20} />
                        <input
                            type="text"
                            placeholder="Search 'Masala Dosa'..."
                            style={{
                                background: 'transparent',
                                border: 'none',
                                color: 'white',
                                width: '100%',
                                fontSize: '1rem',
                                outline: 'none'
                            }}
                        />
                        <div style={{
                            background: 'rgba(226, 55, 68, 0.1)',
                            borderRadius: '10px',
                            padding: '8px'
                        }}>
                            <Filter size={18} color="#E23744" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Categories */}
            <div style={{ marginBottom: '2rem' }}>
                <div style={{
                    display: 'flex',
                    gap: '1rem',
                    overflowX: 'auto',
                    paddingBottom: '1rem',
                    /* Hide scrollbar for clean look */
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none'
                }}>
                    {categories.map(cat => (
                        <button
                            key={cat.name}
                            onClick={() => setCategory(cat.name)}
                            style={{
                                minWidth: 'auto',
                                padding: '0.75rem 1.5rem',
                                borderRadius: '100px',
                                border: category === cat.name ? '1px solid #E23744' : '1px solid rgba(255,255,255,0.1)',
                                background: category === cat.name ? 'rgba(226, 55, 68, 0.1)' : 'transparent',
                                color: category === cat.name ? '#E23744' : '#9CA3AF',
                                fontSize: '0.9rem',
                                fontWeight: 600,
                                whiteSpace: 'nowrap',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            <span style={{ marginRight: '8px' }}>{cat.emoji}</span>
                            {cat.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Product Grid */}
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                Popular Now <TrendingUp size={20} color="#E23744" />
            </h2>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
                gap: '1rem'
            }}>
                {filteredProducts.map((product) => (
                    <div key={product._id} className="glass-panel" style={{
                        borderRadius: '24px',
                        overflow: 'hidden',
                        position: 'relative',
                        transition: 'transform 0.3s ease',
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        {/* Image */}
                        <div style={{ height: '140px', overflow: 'hidden', position: 'relative' }}>
                            <img
                                src={product.image}
                                alt={product.name}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                            <div style={{
                                position: 'absolute',
                                top: '8px',
                                right: '8px',
                                background: 'rgba(0,0,0,0.6)',
                                backdropFilter: 'blur(4px)',
                                borderRadius: '12px',
                                padding: '4px 8px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                fontSize: '0.75rem'
                            }}>
                                <Clock size={12} color="#9CA3AF" />
                                <span style={{ color: 'white' }}>15m</span>
                            </div>
                        </div>

                        {/* Content */}
                        <div style={{ padding: '1rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.name}</h3>
                            <p style={{ fontSize: '0.8rem', color: '#9CA3AF', marginBottom: '1rem', flex: 1 }}>{product.category}</p>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                                <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#E23744' }}>₹{product.price}</span>
                                <button
                                    onClick={() => addToCart(product)}
                                    style={{
                                        background: '#E23744',
                                        color: 'white',
                                        border: 'none',
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '10px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        boxShadow: '0 4px 12px rgba(226, 55, 68, 0.4)'
                                    }}
                                >
                                    <ShoppingCart size={16} />
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
