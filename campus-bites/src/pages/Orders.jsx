import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Clock, CheckCircle, Package } from 'lucide-react';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/orders/mine`, {
                    headers: { 'x-user-id': user.id }
                });
                if (res.ok) {
                    const data = await res.json();
                    setOrders(data);
                }
            } catch (err) {
                console.error('Error fetching orders', err);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, [user.id]);

    if (loading) return <div style={{ padding: '2rem', color: '#9CA3AF' }}>Loading orders...</div>;

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed': return '#22C55E';
            case 'preparing': return '#F59E0B';
            case 'ready': return '#3B82F6';
            default: return '#9CA3AF';
        }
    };

    return (
        <div style={{ padding: '2rem 1rem 8rem 1rem', color: 'white' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '2rem' }}>My Orders</h1>

            {orders.map(order => (
                <div key={order._id} className="glass-panel" style={{
                    marginBottom: '1rem',
                    padding: '1.25rem',
                    borderRadius: '20px'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.75rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{
                                background: 'rgba(255,255,255,0.1)',
                                padding: '8px',
                                borderRadius: '10px'
                            }}>
                                <Package size={20} color="#E23744" />
                            </div>
                            <div>
                                <strong style={{ fontSize: '0.9rem', display: 'block' }}>Order #{order._id.slice(-6)}</strong>
                                <span style={{ fontSize: '0.8rem', color: '#9CA3AF' }}>{new Date(order.createdAt).toLocaleDateString()}</span>
                            </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                background: `rgba(${status === 'completed' ? '34, 197, 94' : '245, 158, 11'}, 0.1)`,
                                padding: '4px 10px',
                                borderRadius: '20px',
                                border: `1px solid ${getStatusColor(order.status)}`,
                                fontSize: '0.8rem',
                                color: getStatusColor(order.status),
                                textTransform: 'capitalize',
                                fontWeight: 600
                            }}>
                                {order.status === 'completed' ? <CheckCircle size={12} /> : <Clock size={12} />}
                                {order.status}
                            </div>
                            <div style={{ fontWeight: 700, marginTop: '6px', fontSize: '1.1rem' }}>₹{order.totalAmount}</div>
                        </div>
                    </div>

                    <div>
                        {order.items.map((item, idx) => (
                            <div key={idx} style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginBottom: '0.5rem',
                                fontSize: '0.9rem',
                                color: '#D1D5DB'
                            }}>
                                <span style={{ display: 'flex', gap: '8px' }}>
                                    <span style={{ color: '#E23744', fontWeight: 600 }}>{item.quantity}x</span>
                                    {item.product?.name || 'Unknown Item'}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            {orders.length === 0 && (
                <div style={{ textAlign: 'center', color: '#9CA3AF', marginTop: '4rem' }}>
                    <p>No past orders found.</p>
                </div>
            )}
        </div>
    );
};

export default Orders;
