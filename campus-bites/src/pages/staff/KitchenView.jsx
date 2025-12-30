import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { LogOut, RefreshCw, CheckCircle, Clock, ChefHat } from 'lucide-react';

import API_URL from '../../apiConfig';

const KitchenView = () => {
    const [orders, setOrders] = useState([]);
    const [filter, setFilter] = useState('All');
    const { logout, user } = useAuth();

    const fetchOrders = async () => {
        try {
            // In a real app, use auth token. Here we use header for prototyping
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

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'preparing': return 'bg-blue-100 text-blue-800';
            case 'ready': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#F3F4F6' }}>
            {/* Header */}
            <header style={{ background: '#2563EB', padding: '1rem', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <ChefHat style={{ marginRight: '1rem' }} />
                    <div>
                        <h1 style={{ fontSize: '1.25rem', margin: 0 }}>Canteen Staff Panel</h1>
                        <span style={{ fontSize: '0.8rem', opacity: 0.9 }}>Welcome, Staff User!</span>
                    </div>
                </div>
                <button onClick={logout} style={{ color: 'white', background: 'rgba(255,255,255,0.2)', padding: '0.5rem 1rem', borderRadius: '0.5rem' }}>Logout</button>
            </header>

            <div className="container mt-6">
                {/* Stats Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
                    <div className="card text-center">
                        <h3>Total Orders</h3>
                        <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2563EB' }}>{stats.total}</p>
                    </div>
                    <div className="card text-center" style={{ borderTop: '4px solid #F59E0B' }}>
                        <h3>Pending</h3>
                        <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#F59E0B' }}>{stats.pending}</p>
                    </div>
                    <div className="card text-center" style={{ borderTop: '4px solid #3B82F6' }}>
                        <h3>Preparing</h3>
                        <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3B82F6' }}>{stats.preparing}</p>
                    </div>
                    <div className="card text-center" style={{ borderTop: '4px solid #10B981' }}>
                        <h3>Ready</h3>
                        <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10B981' }}>{stats.ready}</p>
                    </div>
                </div>

                {/* Filters */}
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                    {['All', 'Pending', 'Preparing', 'Ready'].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            style={{
                                padding: '0.5rem 1.5rem', borderRadius: '2rem', border: 'none', cursor: 'pointer',
                                backgroundColor: filter === f ? '#2563EB' : 'white',
                                color: filter === f ? 'white' : '#4B5563',
                                fontWeight: 600
                            }}
                        >
                            {f}
                        </button>
                    ))}
                    <button onClick={fetchOrders} style={{ marginLeft: 'auto', padding: '0.5rem', borderRadius: '50%', background: 'white', border: 'none', cursor: 'pointer' }}>
                        <RefreshCw size={20} color="#4B5563" />
                    </button>
                </div>

                {/* Orders Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
                    {filteredOrders.length === 0 && <p className="text-gray text-center" style={{ gridColumn: '1/-1', padding: '2rem' }}>No orders in this category</p>}

                    {filteredOrders.map(order => (
                        <div key={order._id} className="card" style={{ borderLeft: `4px solid ${order.status === 'pending' ? '#F59E0B' : order.status === 'preparing' ? '#3B82F6' : '#10B981'}` }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid #F3F4F6', paddingBottom: '0.5rem' }}>
                                <span style={{ fontWeight: 'bold' }}>#{order._id.slice(-6)}</span>
                                <span style={{ textTransform: 'capitalize', fontWeight: 500 }} className={order.status === 'pending' ? 'text-yellow' : 'text-blue'}>{order.status}</span>
                            </div>

                            <div style={{ marginBottom: '1rem' }}>
                                {order.items.map((item, i) => (
                                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                                        <span>{item.quantity}x {item.product?.name || 'Unknown'}</span>
                                    </div>
                                ))}
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                                <div style={{ fontSize: '0.8rem', color: '#6B7280' }}>
                                    <Clock size={14} style={{ display: 'inline', marginRight: '4px' }} />
                                    {new Date(order.pickupTime || order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>

                                {order.status === 'pending' && (
                                    <button
                                        onClick={() => updateStatus(order._id, 'preparing')}
                                        className="btn"
                                        style={{ backgroundColor: '#3B82F6', color: 'white', width: 'auto', padding: '0.5rem 1rem' }}
                                    >
                                        Start Preparing
                                    </button>
                                )}
                                {order.status === 'preparing' && (
                                    <button
                                        onClick={() => updateStatus(order._id, 'ready')}
                                        className="btn"
                                        style={{ backgroundColor: '#10B981', color: 'white', width: 'auto', padding: '0.5rem 1rem' }}
                                    >
                                        Mark Ready
                                    </button>
                                )}
                                {order.status === 'ready' && (
                                    <button
                                        onClick={() => updateStatus(order._id, 'completed')}
                                        className="btn"
                                        style={{ backgroundColor: '#6B7280', color: 'white', width: 'auto', padding: '0.5rem 1rem' }}
                                    >
                                        Complete
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
