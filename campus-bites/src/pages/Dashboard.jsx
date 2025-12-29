import React, { useEffect, useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { UtensilsCrossed, ShoppingBasket, LogOut, Sparkles, User, Pizza, Receipt } from 'lucide-react';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const { cartCount } = useCart();
    const [cartAnim, setCartAnim] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    // Trigger animation when cartCount changes
    useEffect(() => {
        if (cartCount > 0) {
            setCartAnim(true);
            const timer = setTimeout(() => setCartAnim(false), 400);
            return () => clearTimeout(timer);
        }
    }, [cartCount]);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const isActive = (path) => location.pathname === path;

    return (
        <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #FFF5F5 0%, #F9FAFB 100%)' }}>
            <style>{`
                @keyframes slideDown {
                    from { transform: translateY(-100%); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                @keyframes shimmer {
                    0% { background-position: -1000px 0; }
                    100% { background-position: 1000px 0; }
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }
                @keyframes pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                }
                @keyframes slideInLeft {
                    from { transform: translateX(-100px); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideInRight {
                    from { transform: translateX(100px); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideInCenter {
                    from { transform: translateY(50px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                @keyframes rotateIn {
                    from { transform: rotate(-180deg) scale(0); opacity: 0; }
                    to { transform: rotate(0deg) scale(1); opacity: 1; }
                }
                .glass-header {
                    background: linear-gradient(135deg, rgba(239, 68, 68, 0.95) 0%, rgba(220, 38, 38, 0.95) 100%);
                    backdrop-filter: blur(20px);
                    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
                    animation: slideDown 0.6s ease;
                }
                .logo-container {
                    background: rgba(255, 255, 255, 0.2);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    animation: float 3s ease-in-out infinite;
                }
                .logout-btn {
                    background: rgba(255, 255, 255, 0.2);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    transition: all 0.3s ease;
                }
                .logout-btn:hover {
                    background: rgba(255, 255, 255, 0.3);
                    transform: translateY(-2px);
                    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
                }
                .nav-container {
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.5);
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
                    animation: slideInCenter 0.8s ease;
                }
                .nav-link {
                    position: relative;
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .nav-link:hover {
                    transform: translateY(-6px) scale(1.05);
                }
                .nav-link:active {
                    transform: translateY(-2px) scale(0.98);
                }
                .nav-link.active::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 40px;
                    height: 3px;
                    background: linear-gradient(90deg, #EF4444, #F59E0B);
                    border-radius: 2px;
                    animation: shimmer 2s infinite;
                }
                .nav-icon {
                    transition: all 0.3s ease;
                }
                .nav-link:hover .nav-icon {
                    transform: rotate(10deg) scale(1.2);
                }
                .nav-link.active .nav-icon {
                    animation: rotateIn 0.5s ease;
                }
                .cart-badge {
                    background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%);
                    animation: pulse 2s ease-in-out infinite;
                }
                @keyframes badgePop {
                    0% { transform: scale(1); }
                    30% { transform: scale(1.3); }
                    100% { transform: scale(1); }
                }
                .cart-badge-anim {
                    animation: badgePop 0.4s ease-out;
                }
                .welcome-text {
                    background: linear-gradient(90deg, #FFFFFF 0%, #FEF3C7 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
                .sparkle-icon {
                    animation: pulse 2s ease-in-out infinite;
                }
            `}</style>

            {/* Premium Header */}
            <header className="glass-header" style={{
                padding: '1.5rem 0',
                position: 'sticky',
                top: 0,
                zIndex: 100
            }}>
                <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        {/* Logo & Welcome */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div className="logo-container" style={{
                                padding: '0.75rem',
                                borderRadius: '1rem',
                                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)'
                            }}>
                                <UtensilsCrossed color="white" size={32} strokeWidth={2.5} />
                            </div>
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <h1 style={{
                                        fontSize: '1.75rem',
                                        margin: 0,
                                        fontWeight: 800,
                                        color: 'white',
                                        letterSpacing: '-0.5px'
                                    }}>
                                        Campus Bites
                                    </h1>
                                    <Sparkles className="sparkle-icon" size={20} color="#FEF3C7" />
                                </div>
                                <p className="welcome-text" style={{
                                    fontSize: '0.95rem',
                                    margin: 0,
                                    fontWeight: 600,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}>
                                    <User size={16} color="white" />
                                    Welcome, {user?.name || 'Student'}!
                                </p>
                            </div>
                        </div>

                        {/* Logout Button */}
                        <button
                            onClick={handleLogout}
                            className="logout-btn"
                            style={{
                                color: 'white',
                                padding: '0.75rem 1.5rem',
                                borderRadius: '1rem',
                                border: 'none',
                                cursor: 'pointer',
                                fontWeight: 600,
                                fontSize: '0.95rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}
                        >
                            <LogOut size={18} />
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            {/* Floating Navigation Tabs */}
            <div className="container" style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '0 1rem',
                marginTop: '-1.5rem',
                position: 'relative',
                zIndex: 50
            }}>
                <div className="nav-container" style={{
                    borderRadius: '1.5rem',
                    padding: '0.75rem',
                    display: 'flex',
                    gap: '0.5rem'
                }}>
                    <Link
                        to="/dashboard/menu"
                        className={`nav-link ${isActive('/dashboard/menu') ? 'active' : ''}`}
                        style={{
                            flex: 1,
                            textAlign: 'center',
                            padding: '1rem',
                            color: isActive('/dashboard/menu') ? '#EF4444' : '#6B7280',
                            fontWeight: isActive('/dashboard/menu') ? '700' : '500',
                            background: isActive('/dashboard/menu')
                                ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(245, 158, 11, 0.1) 100%)'
                                : 'transparent',
                            borderRadius: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            textDecoration: 'none',
                            fontSize: '0.95rem'
                        }}
                    >
                        <Pizza className="nav-icon" size={22} />
                        Menu
                    </Link>

                    <Link
                        to="/dashboard/cart"
                        className={`nav-link ${isActive('/dashboard/cart') ? 'active' : ''}`}
                        style={{
                            flex: 1,
                            textAlign: 'center',
                            padding: '1rem',
                            color: isActive('/dashboard/cart') ? '#EF4444' : '#6B7280',
                            fontWeight: isActive('/dashboard/cart') ? '700' : '500',
                            background: isActive('/dashboard/cart')
                                ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(245, 158, 11, 0.1) 100%)'
                                : 'transparent',
                            borderRadius: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            textDecoration: 'none',
                            fontSize: '0.95rem',
                            position: 'relative'
                        }}
                    >
                        <ShoppingBasket className="nav-icon" size={22} />
                        Cart
                        {cartCount > 0 && (
                            <span className={`cart-badge ${cartAnim ? 'cart-badge-anim' : ''}`} style={{
                                color: 'white',
                                borderRadius: '50%',
                                padding: '0.25rem 0.6rem',
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                boxShadow: '0 4px 8px rgba(239, 68, 68, 0.4)',
                                minWidth: '24px',
                                height: '24px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>{cartCount}</span>
                        )}
                    </Link>

                    <Link
                        to="/dashboard/orders"
                        className={`nav-link ${isActive('/dashboard/orders') ? 'active' : ''}`}
                        style={{
                            flex: 1,
                            textAlign: 'center',
                            padding: '1rem',
                            color: isActive('/dashboard/orders') ? '#EF4444' : '#6B7280',
                            fontWeight: isActive('/dashboard/orders') ? '700' : '500',
                            background: isActive('/dashboard/orders')
                                ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(245, 158, 11, 0.1) 100%)'
                                : 'transparent',
                            borderRadius: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            textDecoration: 'none',
                            fontSize: '0.95rem'
                        }}
                    >
                        <Receipt className="nav-icon" size={22} />
                        My Orders
                    </Link>
                </div>
            </div>

            {/* Main Content */}
            <main className="container" style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '2rem 1rem',
                paddingBottom: '3rem'
            }}>
                <Outlet />
            </main>
        </div>
    );
};

export default Dashboard;
