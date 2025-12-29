import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Star, Clock, TrendingUp } from 'lucide-react';

const Menu = () => {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState('All');
    const { addToCart } = useCart();
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

    if (loading) return <div className="text-center mt-6">Loading menu...</div>;

    return (
        <div style={{ minHeight: '100vh', background: '#F9FAFB' }}>
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes slideIn {
                    from { opacity: 0; transform: translateX(-20px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                .product-card {
                    background: white;
                    border-radius: 1.5rem;
                    overflow: hidden;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
                    transition: all 0.3s ease;
                    animation: fadeIn 0.5s ease;
                }
                .product-card:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
                }
                .category-btn {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 1rem;
                    border-radius: 1.5rem;
                    border: 2px solid transparent;
                    background: white;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    min-width: 100px;
                }
                .category-btn:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 8px 16px rgba(239, 68, 68, 0.2);
                }
                .category-btn.active {
                    background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%);
                    color: white;
                    border-color: #EF4444;
                }
                .hero-section {
                    background: linear-gradient(135deg, #1F2937 0%, #111827 100%);
                    padding: 3rem 2rem;
                    position: relative;
                    overflow: hidden;
                }
                .hero-bg-image {
                    position: absolute;
                    width: 200px;
                    height: 200px;
                    border-radius: 50%;
                    opacity: 0.1;
                    object-fit: cover;
                }
                .discount-badge {
                    background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%);
                    color: white;
                    padding: 0.75rem 1.5rem;
                    border-radius: 2rem;
                    font-weight: 700;
                    font-size: 1.5rem;
                    display: inline-block;
                    box-shadow: 0 8px 16px rgba(239, 68, 68, 0.3);
                }
                .add-to-cart-btn {
                    background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%);
                    color: white;
                    border: none;
                    padding: 0.75rem 1.5rem;
                    border-radius: 1rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                .add-to-cart-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 16px rgba(239, 68, 68, 0.4);
                }
            `}</style>

            {/* Hero Section with Dark Background */}
            <div className="hero-section">
                {/* Background Food Images */}
                <img src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400" className="hero-bg-image" style={{ top: '10%', left: '5%' }} alt="" />
                <img src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400" className="hero-bg-image" style={{ top: '20%', right: '10%' }} alt="" />
                <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400" className="hero-bg-image" style={{ bottom: '10%', left: '15%' }} alt="" />

                <div style={{ position: 'relative', zIndex: 10, maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <div className="discount-badge" style={{ animation: 'fadeIn 0.8s ease' }}>
                            15% <span style={{ fontSize: '1rem', fontWeight: 500 }}>EXTRA DISCOUNT</span>
                        </div>
                        <h1 style={{ color: 'white', fontSize: '2.5rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.5rem' }}>
                            Get your first order
                        </h1>
                        <p style={{ color: '#9CA3AF', fontSize: '1.2rem' }}>delivery free!</p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
                {/* Category Filter */}
                <div style={{
                    display: 'flex',
                    gap: '1rem',
                    marginBottom: '2rem',
                    overflowX: 'auto',
                    paddingBottom: '1rem',
                    animation: 'slideIn 0.6s ease'
                }}>
                    {categories.map(cat => (
                        <button
                            key={cat.name}
                            onClick={() => setCategory(cat.name)}
                            className={`category-btn ${category === cat.name ? 'active' : ''}`}
                        >
                            <span style={{ fontSize: '2rem' }}>{cat.emoji}</span>
                            <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{cat.name}</span>
                        </button>
                    ))}
                </div>

                {/* Section Title */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#1F2937', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <TrendingUp size={28} color="#EF4444" />
                        Popular Items
                    </h2>
                    <span style={{ color: '#6B7280', fontSize: '0.9rem' }}>{filteredProducts.length} items</span>
                </div>

                {/* Product Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '2rem'
                }}>
                    {filteredProducts.map((product, index) => (
                        <div key={product._id} className="product-card" style={{ animationDelay: `${index * 0.1}s` }}>
                            {/* Product Image */}
                            <div style={{ position: 'relative' }}>
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                                />
                                {/* Discount Badge on Image */}
                                {index % 3 === 0 && (
                                    <div style={{
                                        position: 'absolute',
                                        top: '1rem',
                                        left: '1rem',
                                        background: '#EF4444',
                                        color: 'white',
                                        padding: '0.5rem 1rem',
                                        borderRadius: '2rem',
                                        fontSize: '0.85rem',
                                        fontWeight: 600
                                    }}>
                                        15% off
                                    </div>
                                )}
                            </div>

                            {/* Product Info */}
                            <div style={{ padding: '1.5rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.75rem' }}>
                                    <div>
                                        <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#1F2937', marginBottom: '0.25rem' }}>
                                            {product.name}
                                        </h3>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6B7280', fontSize: '0.85rem' }}>
                                            <Clock size={14} />
                                            <span>10-15 min</span>
                                        </div>
                                    </div>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.25rem',
                                        background: '#FEF3C7',
                                        padding: '0.5rem 0.75rem',
                                        borderRadius: '0.75rem'
                                    }}>
                                        <Star size={16} fill="#F59E0B" color="#F59E0B" />
                                        <span style={{ fontWeight: 700, color: '#D97706' }}>4.8</span>
                                    </div>
                                </div>

                                <p style={{ color: '#6B7280', fontSize: '0.9rem', marginBottom: '1rem', minHeight: '2.5rem' }}>
                                    {product.description}
                                </p>

                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <span style={{ fontSize: '0.75rem', color: '#9CA3AF', textDecoration: 'line-through' }}>
                                            ₹{Math.round(product.price * 1.15)}
                                        </span>
                                        <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#EF4444' }}>
                                            ₹{product.price}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => addToCart(product)}
                                        className="add-to-cart-btn"
                                    >
                                        <ShoppingCart size={18} />
                                        Add
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Menu;
