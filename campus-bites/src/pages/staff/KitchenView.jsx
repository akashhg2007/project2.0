import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { LogOut, RefreshCw, Clock, ChefHat } from 'lucide-react';

import API_URL from '../../apiConfig';

const KitchenView = () => {
    const [orders, setOrders] = useState([]);
    const [filter, setFilter] = useState('All');
    const { logout, user } = useAuth();

    const fetchOrders = async () => {
        try {
            const res = await fetch(`${API_URL}/api/orders/staff/active`, {
                headers: { 'x-user-id': user.id }
            });
            if (res.ok) {
                const data = await res.json();
                setOrders(data);
            }
        } catch (err) {
            console.error('Fetch error', err);
        }
    };

    useEffect(() => {
        fetchOrders();
        const interval = setInterval(fetchOrders, 10000); // Poll every 10s
        return () => clearInterval(interval);
    }, []);

    const updateStatus = async (orderId, newStatus) => {
        try {
            await fetch(`${API_URL}/api/orders/${orderId}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-user-id': user.id
                },
                body: JSON.stringify({ status: newStatus })
            });
            fetchOrders();
        } catch (err) {
            alert('Update failed');
        }
    };

    const stats = {
        total: orders.length,
        pending: orders.filter(o => o.status === 'pending').length,
        preparing: orders.filter(o => o.status === 'preparing').length,
        ready: orders.filter(o => o.status === 'ready').length
    };

    const filteredOrders = filter === 'All' ? orders : orders.filter(o => o.status === filter.toLowerCase());

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#0D0D0D', color: 'white', position: 'relative', overflowX: 'hidden' }}>
            {/* 2026 Graphics & UI Styles */}
            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-15px) rotate(5deg); }
                }
                .floating-emoji {
                    position: absolute;
                    font-size: 3.5rem;
                    opacity: 0.1;
                    pointer-events: none;
                    animation: float 8s ease-in-out infinite;
                    z-index: 1;
                }
                .glass-card {
                    background: rgba(26, 26, 28, 0.95);
                    border-radius: 1.5rem;
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    padding: 1.5rem;
                    transition: all 0.3s ease;
                    position: relative;
                    z-index: 10;
                }
                .glass-card:hover {
                    border-color: rgba(226, 55, 68, 0.3);
                    transform: translateY(-5px);
                    box-shadow: 0 10px 30px rgba(0,0,0,0.4);
                }
                .stat-card {
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    border-radius: 1.25rem;
                    padding: 1.5rem;
                    text-align: center;
                    transition: all 0.3s ease;
                }
                .stat-card:hover {
                    background: rgba(255, 255, 255, 0.05);
                }
                .btn-action {
                    padding: 0.8rem 1.2rem;
                    border-radius: 12px;
                    border: none;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
                    font-size: 0.95rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                }
                .btn-action:hover {
                    filter: brightness(1.1);
                    transform: scale(1.02);
                }
                .btn-action:active {
                    transform: scale(0.98);
                }
                .filter-pill {
                    padding: 0.6rem 1.5rem;
                    border-radius: 12px;
                    border: 1px solid rgba(255,255,255,0.1);
                    cursor: pointer;
                    font-weight: 600;
                    transition: all 0.3s ease;
                }
                /* Custom Scrollbar */
                ::-webkit-scrollbar { width: 8px; }
                ::-webkit-scrollbar-track { background: #0D0D0D; }
                ::-webkit-scrollbar-thumb { background: #1C1C1E; border-radius: 10px; }
                ::-webkit-scrollbar-thumb:hover { background: #2C2C2E; }
            `}</style>

            {/* Background Decor */}
            <div className="floating-emoji" style={{ top: '10%', right: '5%' }}>🍳</div>
            <div className="floating-emoji" style={{ top: '60%', left: '3%' }}>🔪</div>
            <div className="floating-emoji" style={{ bottom: '10%', right: '15%' }}>🥗</div>

            {/* Header */}
            <header style={{
                background: '#111111',
                padding: '1.25rem 2.5rem',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                position: 'sticky',
                top: 0,
                zIndex: 100,
                backdropFilter: 'blur(10px)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{
                        background: 'linear-gradient(135deg, #E23744 0%, #B91C1C 100%)',
                        padding: '10px',
                        borderRadius: '12px',
                        boxShadow: '0 8px 20px rgba(226, 55, 68, 0.3)'
                    }}>
                        <ChefHat color="white" size={24} />
                    </div>
                    <div>
                        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0, letterSpacing: '-0.5px' }}>Kitchen Terminal</h1>
                        <p style={{ fontSize: '0.8rem', color: '#6B7280', margin: 0 }}>Active Session: {user?.name || 'In-Charge'}</p>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button onClick={fetchOrders} style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: 'white',
                        padding: '0.6rem 1.2rem',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontWeight: 600
                    }}>
                        <RefreshCw size={18} /> Sync Orders
                    </button>
                    <button onClick={logout} style={{
                        background: 'rgba(239, 68, 68, 0.1)',
                        border: '1px solid rgba(239, 68, 68, 0.2)',
                        color: '#F87171',
                        padding: '0.6rem 1.2rem',
                        borderRadius: '12px',
                        fontWeight: 700,
                        cursor: 'pointer'
                    }}>Logout</button>
                </div>
            </header>

            <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '2.5rem' }}>
                {/* Stats Dashboard */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                    <div className="stat-card">
                        <p style={{ fontSize: '0.85rem', color: '#6B7280', marginBottom: '0.5rem', fontWeight: 600 }}>TOTAL ORDERS</p>
                        <p style={{ fontSize: '2.5rem', fontWeight: 800, margin: 0, color: 'white' }}>{stats.total}</p>
                    </div>
                    <div className="stat-card" style={{ borderTop: '4px solid #F59E0B' }}>
                        <p style={{ fontSize: '0.85rem', color: '#6B7280', marginBottom: '0.5rem', fontWeight: 600 }}>PENDING</p>
                        <p style={{ fontSize: '2.5rem', fontWeight: 800, margin: 0, color: '#F59E0B' }}>{stats.pending}</p>
                    </div>
                    <div className="stat-card" style={{ borderTop: '4px solid #E23744' }}>
                        <p style={{ fontSize: '0.85rem', color: '#6B7280', marginBottom: '0.5rem', fontWeight: 600 }}>PREPARING</p>
                        <p style={{ fontSize: '2.5rem', fontWeight: 800, margin: 0, color: '#E23744' }}>{stats.preparing}</p>
                    </div>
                    <div className="stat-card" style={{ borderTop: '4px solid #22C55E' }}>
                        <p style={{ fontSize: '0.85rem', color: '#6B7280', marginBottom: '0.5rem', fontWeight: 600 }}>READY</p>
                        <p style={{ fontSize: '2.5rem', fontWeight: 800, margin: 0, color: '#22C55E' }}>{stats.ready}</p>
                    </div>
                </div>

                {/* Navigation / Filters */}
                <div style={{ display: 'flex', gap: '0.85rem', marginBottom: '2.5rem' }}>
                    {['All', 'Pending', 'Preparing', 'Ready'].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className="filter-pill"
                            style={{
                                backgroundColor: filter === f ? '#E23744' : 'rgba(255,255,255,0.05)',
                                color: filter === f ? 'white' : '#9CA3AF',
                                borderColor: filter === f ? '#E23744' : 'rgba(255,255,255,0.1)'
                            }}
                        >
                            {f} Orders
                        </button>
                    ))}
                </div>

                {/* Orders Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '2rem' }}>
                    {filteredOrders.length === 0 && (
                        <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '6rem 0' }}>
                            <div style={{ display: 'inline-flex', padding: '2rem', borderRadius: '50%', background: 'rgba(255,255,255,0.02)', marginBottom: '1.5rem' }}>
                                <ChefHat size={48} style={{ opacity: 0.2, color: 'white' }} />
                            </div>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0 0 0.5rem 0' }}>No active orders</h2>
                            <p style={{ color: '#6B7280' }}>All clear! Relax or sync to check for new orders.</p>
                        </div>
                    )}

                    {filteredOrders.map(order => (
                        <div key={order._id} className="glass-card">
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                <div>
                                    <p style={{ fontSize: '0.7rem', color: '#6B7280', margin: '0 0 2px 0', letterSpacing: '1px', fontWeight: 700 }}>ORDER TICKET</p>
                                    <p style={{ fontWeight: 800, fontSize: '1.25rem', color: 'white', margin: 0 }}>#{order._id.slice(-6).toUpperCase()}</p>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <p style={{ fontSize: '0.7rem', color: '#6B7280', margin: '0 0 2px 0', letterSpacing: '1px', fontWeight: 700 }}>PICKUP TIME</p>
                                    <p style={{ fontWeight: 700, color: '#E23744', margin: 0, fontSize: '1.1rem' }}>
                                        <Clock size={16} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
                                        {new Date(order.pickupTime || order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                </div>
                            </div>

                            <div style={{ marginBottom: '2rem', minHeight: '80px' }}>
                                {order.items.map((item, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '0.75rem' }}>
                                        <div style={{
                                            width: '28px',
                                            height: '28px',
                                            borderRadius: '8px',
                                            background: 'rgba(226, 55, 68, 0.1)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '0.9rem',
                                            fontWeight: 800,
                                            color: '#E23744',
                                            border: '1px solid rgba(226, 55, 68, 0.2)'
                                        }}>
                                            {item.quantity}
                                        </div>
                                        <span style={{ color: '#E5E7EB', fontWeight: 500, fontSize: '1.05rem' }}>{item.product?.name || 'Item Expired'}</span>
                                    </div>
                                ))}
                            </div>

                            <div style={{ marginTop: 'auto' }}>
                                {order.status === 'pending' && (
                                    <button
                                        onClick={() => updateStatus(order._id, 'preparing')}
                                        className="btn-action"
                                        style={{ backgroundColor: '#E23744', color: 'white', width: '100%', boxShadow: '0 8px 20px rgba(226, 55, 68, 0.2)' }}
                                    >
                                        Accept & Start Preparing
                                    </button>
                                )}
                                {order.status === 'preparing' && (
                                    <button
                                        onClick={() => updateStatus(order._id, 'ready')}
                                        className="btn-action"
                                        style={{ backgroundColor: '#F59E0B', color: 'white', width: '100%', boxShadow: '0 8px 20px rgba(245, 158, 11, 0.2)' }}
                                    >
                                        Mark as Ready to Pickup
                                    </button>
                                )}
                                {order.status === 'ready' && (
                                    <button
                                        onClick={() => updateStatus(order._id, 'completed')}
                                        className="btn-action"
                                        style={{ backgroundColor: '#22C55E', color: 'white', width: '100%', boxShadow: '0 8px 20px rgba(34, 197, 94, 0.2)' }}
                                    >
                                        Handover & Complete
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default KitchenView;
