import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

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

    if (loading) return <div className="p-4">Loading orders...</div>;

    return (
        <div>
            <h2 className="mb-4">My Orders</h2>
            {orders.map(order => (
                <div key={order._id} className="card mb-4" style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid #F3F4F6', paddingBottom: '0.5rem' }}>
                        <div>
                            <strong>#{order._id.slice(-6)}</strong>
                            <div className="text-sm text-gray">{new Date(order.createdAt).toLocaleDateString()}</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <span style={{
                                backgroundColor: order.status === 'completed' ? '#D1FAE5' : '#FEF3C7',
                                color: order.status === 'completed' ? '#059669' : '#D97706',
                                padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.875rem', fontWeight: 600,
                                textTransform: 'capitalize'
                            }}>
                                {order.status}
                            </span>
                            <div style={{ fontWeight: 600, marginTop: '0.25rem' }}>₹{order.totalAmount}</div>
                        </div>
                    </div>
                    <div>
                        {order.items.map((item, idx) => (
                            <div key={idx} className="text-sm text-gray" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                                <span>{item.quantity}x {item.product?.name || 'Unknown Item'}</span>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
            {orders.length === 0 && <p className="text-center text-gray">No orders found.</p>}
        </div>
    );
};

export default Orders;
