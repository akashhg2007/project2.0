import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ShoppingCart, Star, Clock, Search, TrendingUp, Sparkles, Filter, Plus, ChefHat, User } from 'lucide-react';
import API_URL from '../apiConfig';

const Menu = () => {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState('All');
    const { addToCart } = useCart();
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch(`${API_URL}/api/products`);
                if (!res.ok) throw new Error('Failed to fetch');
                const data = await res.json();
                setProducts(data);
            } catch (err) {
                console.log('Using mock data');
                setProducts([
                    { _id: '1', name: 'Samosa', price: 20, category: 'Snacks', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&auto=format&fit=crop&q=60', description: 'Crispy fried pastry', isBestSeller: true },
                    { _id: '2', name: 'Vada Pav', price: 25, category: 'Snacks', image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500&auto=format&fit=crop&q=60', description: 'Mumbai favorite', isSpicy: true },
                    { _id: '3', name: 'Veg Sandwich', price: 40, category: 'Snacks', image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500&auto=format&fit=crop&q=60', description: 'Grilled vegetable sandwich' },
                    { _id: '4', name: 'Masala Chai', price: 15, category: 'Beverages', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=500&auto=format&fit=crop&q=60', description: 'Spiced Indian tea', isPopular: true },
                    { _id: '5', name: 'Paneer Tikka', price: 120, category: 'Snacks', image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500&auto=format&fit=crop&q=60', description: 'Grilled paneer cubes', isBestSeller: true },
                    { _id: '6', name: 'Cold Coffee', price: 45, category: 'Beverages', image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=500&auto=format&fit=crop&q=60', description: 'Refreshing cold coffee' }
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

    const filteredProducts = products.filter(p => {
        const matchesCategory = category === 'All' || p.category === category;
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    if (loading) return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#9CA3AF'
        }}>
            <style>{`
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
            <Sparkles style={{ animation: 'spin-slow 3s linear infinite' }} size={48} color="#E23744" />
        </div>
    );

    return (
        <div style={{ padding: '0 1rem 8rem 1rem', maxWidth: '600px', margin: '0 auto' }}>
            <style>{`
                @keyframes slideInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes scaleIn {
                    from { transform: scale(0.9); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
                @keyframes shimmer {
                    0% { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                }
                .product-card {
                    animation: scaleIn 0.4s ease-out forwards;
                    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }
                .product-card:active {
                    transform: scale(0.95);
                }
                .category-btn {
                    transition: all 0.2s ease;
                }
                .category-btn:active {
                    transform: scale(0.9);
                }
                .hero-banner {
                    background: linear-gradient(135deg, rgba(226, 55, 68, 0.2) 0%, rgba(0, 0, 0, 0) 100%);
                    border: 1px solid rgba(226, 55, 68, 0.3);
                    border-radius: 24px;
                    padding: 1.5rem;
                    margin-bottom: 2rem;
                    position: relative;
                    overflow: hidden;
                    animation: fadeIn 1s ease-out;
                }
                .hero-banner::after {
                    content: '';
                    position: absolute;
                    top: 0; left: 0; right: 0; bottom: 0;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent);
                    background-size: 200% 100%;
                    animation: shimmer 3s infinite linear;
                    pointer-events: none;
                }
            `}</style>

            {/* Header / Hero */}
            <div style={{ paddingTop: '2.5rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.05)', padding: '6px 12px', borderRadius: '100px', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <Clock size={14} color="#E23744" />
                        <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>Canteen Open</span>
                    </div>
                </div>

                <h1 style={{
                    fontSize: '2.2rem',
                    fontWeight: 800,
                    marginBottom: '1.5rem',
                    color: 'white',
                    animation: 'slideInUp 0.5s ease-out'
                }}>
                    Hungry, <span style={{ color: '#E23744' }}>{user?.name?.split(' ')[0] || 'Peer'}?</span> 😋
                </h1>

                {/* Search Omni-bar */}
                <div className="glass-panel" style={{
                    borderRadius: '20px',
                    padding: '0.75rem 1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    animation: 'slideInUp 0.6s ease-out',
                    border: '1px solid rgba(255,255,255,0.15)'
                }}>
                    <Search color="#9CA3AF" size={20} />
                    <input
                        type="text"
                        placeholder="Search for food..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            color: 'white',
                            width: '100%',
                            fontSize: '1rem',
                            outline: 'none'
                        }}
                    />
                    <div style={{ background: 'rgba(226, 55, 68, 0.15)', borderRadius: '12px', padding: '10px' }}>
                        <TrendingUp size={18} color="#E23744" />
                    </div>
                </div>
            </div>

            {/* Special Promo Banner */}
            <div className="hero-banner">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                            <Sparkles size={16} color="#F59E0B" />
                            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#F59E0B', textTransform: 'uppercase' }}>Limited Offer</span>
                        </div>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '4px' }}>Free Chai with Snacks</h3>
                        <p style={{ fontSize: '0.8rem', color: '#9CA3AF' }}>Orders above ₹50 | Valid till 4 PM</p>
                    </div>
                    <div style={{ fontSize: '3rem', opacity: 0.8 }}>🫖</div>
                </div>
            </div>

            {/* Categories */}
            <div style={{ marginBottom: '2rem' }}>
                <div style={{
                    display: 'flex',
                    gap: '0.75rem',
                    overflowX: 'auto',
                    paddingBottom: '0.5rem',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none'
                }}>
                    {categories.map((cat, idx) => (
                        <button
                            key={cat.name}
                            onClick={() => setCategory(cat.name)}
                            className="category-btn"
                            style={{
                                padding: '0.6rem 1.2rem',
                                borderRadius: '100px',
                                border: category === cat.name ? '2px solid #E23744' : '1px solid rgba(255,255,255,0.1)',
                                background: category === cat.name ? 'rgba(226, 55, 68, 0.15)' : 'rgba(255,255,255,0.05)',
                                color: category === cat.name ? '#E23744' : 'white',
                                fontSize: '0.85rem',
                                fontWeight: 700,
                                whiteSpace: 'nowrap',
                                animation: `fadeIn 0.5s ease-out ${idx * 0.1}s forwards`,
                                opacity: 0,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}
                        >
                            <span>{cat.emoji}</span>
                            {cat.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Product Grid */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.3rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    Menu <Filter size={18} color="#E23744" />
                </h2>
                <span style={{ fontSize: '0.8rem', color: '#9CA3AF', fontWeight: 500 }}>{filteredProducts.length} items</span>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)', // 2 columns for mobile
                gap: '1rem'
            }}>
                {filteredProducts.map((product, idx) => (
                    <div
                        key={product._id}
                        className="glass-panel product-card"
                        style={{
                            borderRadius: '24px',
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column',
                            animationDelay: `${idx * 0.05}s`,
                            border: '1px solid rgba(255,255,255,0.1)',
                            background: 'rgba(20, 20, 20, 0.6)'
                        }}
                    >
                        {/* Image */}
                        <div style={{ height: '140px', overflow: 'hidden', position: 'relative' }}>
                            <img
                                src={product.image}
                                alt={product.name}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                            {/* Badges */}
                            {product.isBestSeller && (
                                <div style={{ position: 'absolute', top: '10px', left: '10px', background: '#F59E0B', color: 'black', padding: '3px 8px', borderRadius: '8px', fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase' }}>
                                    Best Seller
                                </div>
                            )}
                            {product.isSpicy && (
                                <div style={{ position: 'absolute', top: '10px', left: '10px', background: '#EF4444', color: 'white', padding: '3px 8px', borderRadius: '8px', fontSize: '0.65rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '3px' }}>
                                    🌶️ Spicy
                                </div>
                            )}
                            <div style={{
                                position: 'absolute',
                                bottom: '10px',
                                right: '10px',
                                background: 'rgba(0,0,0,0.6)',
                                backdropFilter: 'blur(8px)',
                                borderRadius: '10px',
                                padding: '4px 8px',
                                color: 'white',
                                fontSize: '0.7rem',
                                fontWeight: 700
                            }}>
                                15 min
                            </div>
                        </div>

                        {/* Content */}
                        <div style={{ padding: '0.8rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <h3 style={{ fontSize: '0.95rem', fontWeight: 800, marginBottom: '2px', color: 'white' }}>{product.name}</h3>
                            <p style={{ fontSize: '0.75rem', color: '#9CA3AF', marginBottom: '1rem', flex: 1 }}>{product.category}</p>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '1.2rem', fontWeight: 900, color: 'white' }}>₹{product.price}</span>
                                <button
                                    onClick={() => addToCart(product)}
                                    style={{
                                        background: '#E23744',
                                        color: 'white',
                                        border: 'none',
                                        width: '36px',
                                        height: '36px',
                                        borderRadius: '12px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        boxShadow: '0 4px 15px rgba(226, 55, 68, 0.4)',
                                        transition: 'all 0.2s ease'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                >
                                    <Plus size={20} strokeWidth={3} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Bottom Info */}
            <div style={{ marginTop: '3rem', textAlign: 'center', padding: '2rem', background: 'rgba(255,255,255,0.02)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <ChefHat size={32} color="#E23744" style={{ margin: '0 auto 1rem' }} />
                <h4 style={{ fontWeight: 700, marginBottom: '0.5rem' }}>Hygiene Guaranteed</h4>
                <p style={{ fontSize: '0.8rem', color: '#9CA3AF' }}>Our kitchen follows all COVID-19 safety protocols.</p>
            </div>
        </div>
    );
};

export default Menu;
