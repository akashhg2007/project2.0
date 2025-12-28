import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Minus, Plus, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const { cartItems, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();
    const { user } = useAuth();
    const [pickupTime, setPickupTime] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleCheckout = async () => {
        if (!pickupTime) {
            alert('Please select a pickup time');
            return;
        }
        setLoading(true);
        try {
            const orderData = {
                items: cartItems.map(item => ({ product: item._id, quantity: item.quantity, price: item.price })),
                totalAmount: cartTotal,
                pickupTime
            };

            const res = await fetch('http://localhost:5000/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-user-id': user.id
                },
                body: JSON.stringify(orderData)
            });

            if (res.ok) {
                clearCart();
                alert('Order placed successfully!');
                navigate('/dashboard/orders');
            } else {
                throw new Error('Failed to place order');
            }
        } catch (e) {
            alert('Failed to place order');
        } finally {
            setLoading(false);
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="card text-center" style={{ padding: '3rem' }}>
                <h2>Your Cart is Empty</h2>
                <p className="text-gray mt-2">Looks like you haven't added any delicious food yet.</p>
            </div>
        );
    }

    return (
        <div>
            <div className="card mb-4" style={{ padding: '1.5rem' }}>
                <h2 className="mb-4">Your Cart</h2>
                {cartItems.map(item => (
                    <div key={item._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #F3F4F6', padding: '1rem 0' }}>
                        <div>
                            <h4 style={{ marginBottom: '0.25rem' }}>{item.name}</h4>
                            <p className="text-gray text-sm">₹{item.price} each</p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#F3F4F6', borderRadius: '0.5rem' }}>
                                <button onClick={() => updateQuantity(item._id, -1)} style={{ padding: '0.5rem', cursor: 'pointer', color: '#EF4444' }} disabled={item.quantity <= 1 && false}><Minus size={16} /></button>
                                <span style={{ padding: '0 0.5rem', fontWeight: 600 }}>{item.quantity}</span>
                                <button onClick={() => updateQuantity(item._id, 1)} style={{ padding: '0.5rem', cursor: 'pointer', color: '#10B981' }}><Plus size={16} /></button>
                            </div>
                            <div style={{ fontWeight: 600, minWidth: '60px', textAlign: 'right' }}>₹{item.price * item.quantity}</div>
                        </div>
                    </div>
                ))}
                <div style={{ borderTop: '2px solid #F3F4F6', marginTop: '1rem', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3>Total</h3>
                    <h3 style={{ color: '#EF4444' }}>₹{cartTotal}</h3>
                </div>
            </div>

            <div className="card mb-4">
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                    <Clock className="text-gray" style={{ marginRight: '0.5rem' }} />
                    <h3>Select Pickup Time</h3>
                </div>
                <select
                    className="input-field"
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                >
                    <option value="">Choose a time slot</option>
                    <option value="12:00 PM">12:00 PM</option>
                    <option value="12:30 PM">12:30 PM</option>
                    <option value="01:00 PM">01:00 PM</option>
                    <option value="01:30 PM">01:30 PM</option>
                    <option value="02:00 PM">02:00 PM</option>
                </select>
                <p className="text-sm text-gray mt-2">Orders can be placed 30 minutes to 6 hours in advance.</p>
            </div>

            <button
                className="btn btn-primary"
                style={{ padding: '1rem', fontSize: '1.1rem' }}
                onClick={handleCheckout}
                disabled={loading}
            >
                {loading ? 'Processing...' : `Pay ₹${cartTotal} & Place Order`}
            </button>
        </div>
    );
};

export default Cart;
