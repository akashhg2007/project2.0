import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { UtensilsCrossed, ShoppingBag, History, LogOut, Utensils, ShoppingCart } from 'lucide-react';

// Using standard lucide icons
// import { UtensilsCrossed, ShoppingBag, History, LogOut } from 'lucide-react'; // This line is now redundant after the change

const Dashboard = () => {
    const { user, logout } = useAuth();
    const { cartCount } = useCart();
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const isActive = (path) => location.pathname === path;

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#F3F4F6' }}>
            {/* Header */}
            <header style={{
                background: 'linear-gradient(90deg, #EF4444 0%, #F59E0B 100%)',
                padding: '1rem',
                color: 'white',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
                <div className="container flex-center" style={{ justifyContent: 'space-between' }}>
                    <div className="flex-center">
                        <div style={{ marginRight: '1rem', backgroundColor: 'rgba(255,255,255,0.2)', padding: '0.5rem', borderRadius: '50%' }}>
                            <UtensilsCrossed color="white" size={24} />
                        </div>
                        <div>
                            <h1 style={{ fontSize: '1.25rem', margin: 0 }}>Campus Bites</h1>
                            <p style={{ fontSize: '0.875rem', opacity: 0.9 }}>Welcome, {user?.name || 'Student'}!</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        style={{
                            backgroundColor: 'rgba(255,255,255,0.2)',
                            color: 'white',
                            padding: '0.5rem 1rem',
                            borderRadius: '0.5rem',
                            border: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        Logout
                    </button>
                </div>
            </header>

            {/* Navigation Tabs */}
            <div className="container" style={{ marginTop: '-1.5rem' }}>
                <div style={{
                    backgroundColor: 'white',
                    borderRadius: '0.5rem',
                    padding: '0.5rem',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                    display: 'flex',
                    justifyContent: 'space-around'
                }}>
                    <Link to="/dashboard/menu" style={{
                        flex: 1,
                        textAlign: 'center',
                        padding: '1rem',
                        color: isActive('/dashboard/menu') ? '#EF4444' : '#6B7280',
                        fontWeight: isActive('/dashboard/menu') ? '600' : '400',
                        borderBottom: isActive('/dashboard/menu') ? '2px solid #EF4444' : '2px solid transparent',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        <UtensilsCrossed size={20} style={{ marginRight: '0.5rem' }} /> Menu
                    </Link>
                    <Link to="/dashboard/cart" style={{
                        flex: 1,
                        textAlign: 'center',
                        padding: '1rem',
                        color: isActive('/dashboard/cart') ? '#EF4444' : '#6B7280',
                        fontWeight: isActive('/dashboard/cart') ? '600' : '400',
                        borderBottom: isActive('/dashboard/cart') ? '2px solid #EF4444' : '2px solid transparent',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        <ShoppingBag size={20} style={{ marginRight: '0.5rem' }} /> Cart
                        {cartCount > 0 && <span style={{
                            backgroundColor: '#EF4444', color: 'white', borderRadius: '50%',
                            padding: '0.1rem 0.5rem', fontSize: '0.75rem', marginLeft: '0.5rem'
                        }}>{cartCount}</span>}
                    </Link>
                    <Link to="/dashboard/orders" style={{
                        flex: 1,
                        textAlign: 'center',
                        padding: '1rem',
                        color: isActive('/dashboard/orders') ? '#EF4444' : '#6B7280',
                        fontWeight: isActive('/dashboard/orders') ? '600' : '400',
                        borderBottom: isActive('/dashboard/orders') ? '2px solid #EF4444' : '2px solid transparent',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        <History size={20} style={{ marginRight: '0.5rem' }} /> My Orders
                    </Link>
                </div>
            </div>

            {/* Main Content */}
            <main className="container mt-6" style={{ paddingBottom: '2rem' }}>
                <Outlet />
            </main>
        </div>
    );
};

export default Dashboard;
