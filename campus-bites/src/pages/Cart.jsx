import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Minus, Plus, Clock, ShoppingBag, ArrowRight, CreditCard, Wallet } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import API_URL from '../apiConfig';

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

            const res = await fetch(`${API_URL}/api/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-user-id': user.id
                },
                body: JSON.stringify(orderData)
            });

            if (res.ok) {
                clearCart();
                // Custom vibration/success feedback could go here
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
            <div style={{
                minHeight: '80vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                color: 'white'
            }}>
                <div style={{
                    background: 'rgba(226, 55, 68, 0.1)',
                    padding: '2rem',
                    borderRadius: '50%',
                    marginBottom: '1.5rem'
                }}>
                    <ShoppingBag size={64} color="#E23744" opacity={0.6} />
                </div>
                <h2 style={{ marginBottom: '0.5rem' }}>Your Cart is Empty</h2>
                <p style={{ color: '#9CA3AF' }}>Looks like you haven't added any delicious food yet.</p>
                <button
                    onClick={() => navigate('/dashboard/menu')}
                    style={{
                        marginTop: '2rem',
                        background: '#E23744',
                        color: 'white',
                        border: 'none',
                        padding: '1rem 2rem',
                        borderRadius: '20px',
                        cursor: 'pointer',
                        fontWeight: 600
                    }}
                >
                    Browse Menu
                </button>
            </div>
        );
    }

    return (
        <div style={{ padding: '2rem 1rem 8rem 1rem', color: 'white' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '2rem' }}>Cart</h1>

            {/* Cart Items List */}
            <div style={{ marginBottom: '2rem' }}>
                {cartItems.map(item => (
                    <div key={item._id} className="glass-panel" style={{
                        marginBottom: '1rem',
                        padding: '1rem',
                        borderRadius: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem'
                    }}>
                        {/* Tiny Image Thumbnail */}
                        <div style={{ width: '60px', height: '60px', borderRadius: '12px', overflow: 'hidden' }}>
                            <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>

                        <div style={{ flex: 1 }}>
                            <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '4px' }}>{item.name}</h3>
                            <p style={{ color: '#9CA3AF', fontSize: '0.9rem' }}>₹{item.price}</p>
                        </div>

                        {/* Quantity Controls */}
                        <div style={{
                            background: '#27272A',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            padding: '4px'
                        }}>
                            <button
                                onClick={() => item.quantity > 1 ? updateQuantity(item._id, -1) : removeFromCart(item._id)}
                                style={{ background: 'transparent', border: 'none', color: '#E23744', padding: '6px', cursor: 'pointer' }}
                            >
                                <Minus size={16} />
                            </button>
                            <span style={{ margin: '0 8px', fontWeight: 600, fontSize: '0.9rem' }}>{item.quantity}</span>
                            <button
                                onClick={() => updateQuantity(item._id, 1)}
                                style={{ background: 'transparent', border: 'none', color: '#E23744', padding: '6px', cursor: 'pointer' }}
                            >
                                <Plus size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Bill Details */}
            <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '24px', marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>Bill Details</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', color: '#9CA3AF', fontSize: '0.9rem' }}>
                    <span>Item Total</span>
                    <span>₹{cartTotal}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', color: '#9CA3AF', fontSize: '0.9rem' }}>
                    <span>Delivery Fee</span>
                    <span style={{ color: '#22C55E' }}>Free</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', color: '#9CA3AF', fontSize: '0.9rem' }}>
                    <span>Govt Taxes & Charges</span>
                    <span>₹{Math.round(cartTotal * 0.05)}</span>
                </div>
                <div style={{
                    borderTop: '1px solid rgba(255,255,255,0.1)',
                    paddingTop: '1rem',
                    marginTop: '1rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontWeight: 700,
                    fontSize: '1.2rem'
                }}>
                    <span>To Pay</span>
                    <span>₹{cartTotal + Math.round(cartTotal * 0.05)}</span>
                </div>
            </div>

            {/* Pickup Time Selection */}
            <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Clock size={16} color="#E23744" /> Select Pickup Time
                </h3>

                <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '24px' }}>
                    {/* Visual Clock Display */}
                    <div style={{
                        position: 'relative',
                        width: '200px',
                        height: '200px',
                        margin: '0 auto 1.5rem',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, rgba(226, 55, 68, 0.1) 0%, rgba(220, 38, 38, 0.05) 100%)',
                        border: '3px solid rgba(226, 55, 68, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        {/* Clock Face Numbers */}
                        {[12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((num, idx) => {
                            const angle = (idx * 30 - 90) * (Math.PI / 180);
                            const radius = 75;
                            const x = Math.cos(angle) * radius;
                            const y = Math.sin(angle) * radius;
                            return (
                                <div
                                    key={num}
                                    style={{
                                        position: 'absolute',
                                        left: `calc(50% + ${x}px - 12px)`,
                                        top: `calc(50% + ${y}px - 12px)`,
                                        width: '24px',
                                        height: '24px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '0.85rem',
                                        fontWeight: 600,
                                        color: '#9CA3AF'
                                    }}
                                >
                                    {num}
                                </div>
                            );
                        })}

                        {/* Center Dot */}
                        <div style={{
                            width: '12px',
                            height: '12px',
                            borderRadius: '50%',
                            background: '#E23744',
                            position: 'absolute',
                            zIndex: 10,
                            boxShadow: '0 0 10px rgba(226, 55, 68, 0.5)'
                        }} />

                        {/* Clock Hands */}
                        {(() => {
                            let hourDeg = 90; // Default 3 o'clock (horizontal right) is 0deg in CSS rotation if not handled carefully, but let's assume standard 12 is top.
                            // CSS transform rotate(0deg) points UP if element is vertical.
                            // But usually with absolute positioning we center it.
                            // Let's parse the time string "HH:MM PM"
                            let minuteDeg = 0;

                            if (pickupTime) {
                                try {
                                    // Example: "12:30 PM"
                                    const [timePart, modifier] = pickupTime.split(' ');
                                    let [hours, minutes] = timePart.split(':').map(Number);

                                    if (modifier === 'PM' && hours !== 12) hours += 12;
                                    if (modifier === 'AM' && hours === 12) hours = 0;

                                    // Convert to degrees
                                    // 12 hours = 360 deg => 1 hour = 30 deg
                                    // 60 min = 360 deg => 1 min = 6 deg
                                    // Hour hand moves by minutes too: 0.5 deg per minute
                                    hourDeg = (hours % 12) * 30 + minutes * 0.5;
                                    minuteDeg = minutes * 6;
                                } catch (e) {
                                    // Default if parse fails
                                    const now = new Date();
                                    hourDeg = (now.getHours() % 12) * 30 + now.getMinutes() * 0.5;
                                    minuteDeg = now.getMinutes() * 6;
                                }
                            } else {
                                // Default default: current time
                                const now = new Date();
                                hourDeg = (now.getHours() % 12) * 30 + now.getMinutes() * 0.5;
                                minuteDeg = now.getMinutes() * 6;
                            }

                            return (
                                <>
                                    {/* Hour Hand */}
                                    <div style={{
                                        position: 'absolute',
                                        bottom: '50%',
                                        left: '50%',
                                        width: '4px',
                                        height: '50px',
                                        background: '#E23744',
                                        borderRadius: '4px',
                                        transformOrigin: 'bottom center',
                                        transform: `translateX(-50%) rotate(${hourDeg}deg)`,
                                        transition: 'transform 0.5s cubic-bezier(0.4, 2.08, 0.55, 0.44)',
                                        zIndex: 5
                                    }} />
                                    {/* Minute Hand */}
                                    <div style={{
                                        position: 'absolute',
                                        bottom: '50%',
                                        left: '50%',
                                        width: '2px',
                                        height: '70px',
                                        background: 'white',
                                        borderRadius: '4px',
                                        transformOrigin: 'bottom center',
                                        transform: `translateX(-50%) rotate(${minuteDeg}deg)`,
                                        transition: 'transform 0.5s cubic-bezier(0.4, 2.08, 0.55, 0.44)',
                                        zIndex: 4
                                    }} />
                                </>
                            );
                        })()}

                        {/* Selected Time Display */}
                        <div style={{
                            position: 'absolute',
                            bottom: '20%',
                            fontSize: '1.2rem',
                            fontWeight: 700,
                            color: '#E23744',
                            textShadow: '0 2px 8px rgba(226, 55, 68, 0.3)',
                            background: 'rgba(0,0,0,0.4)',
                            padding: '4px 12px',
                            borderRadius: '12px'
                        }}>
                            {pickupTime || 'Select Time'}
                        </div>
                    </div>

                    {/* Quick Time Slots */}
                    <div style={{ marginBottom: '1rem' }}>
                        <p style={{ fontSize: '0.85rem', color: '#9CA3AF', marginBottom: '0.75rem' }}>Quick Select</p>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                            {['12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM'].map(time => (
                                <button
                                    key={time}
                                    onClick={() => setPickupTime(time)}
                                    style={{
                                        padding: '0.75rem',
                                        borderRadius: '12px',
                                        border: pickupTime === time ? '2px solid #E23744' : '1px solid rgba(255,255,255,0.1)',
                                        background: pickupTime === time ? 'rgba(226, 55, 68, 0.1)' : 'rgba(255,255,255,0.03)',
                                        color: pickupTime === time ? '#E23744' : 'white',
                                        fontSize: '0.85rem',
                                        fontWeight: 600,
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    {time}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Manual Time Input */}
                    <div>
                        <p style={{ fontSize: '0.85rem', color: '#9CA3AF', marginBottom: '0.75rem' }}>Or Enter Manually</p>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                            <input
                                type="time"
                                onChange={(e) => {
                                    if (e.target.value) {
                                        const [hours, minutes] = e.target.value.split(':');
                                        const hour = parseInt(hours);
                                        const ampm = hour >= 12 ? 'PM' : 'AM';
                                        const displayHour = hour % 12 || 12;
                                        setPickupTime(`${displayHour.toString().padStart(2, '0')}:${minutes} ${ampm}`);
                                    }
                                }}
                                style={{
                                    flex: 1,
                                    padding: '0.75rem',
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '12px',
                                    color: 'white',
                                    fontSize: '0.95rem',
                                    outline: 'none'
                                }}
                            />
                            <div style={{
                                padding: '0.75rem',
                                background: 'rgba(226, 55, 68, 0.1)',
                                borderRadius: '12px',
                                border: '1px solid rgba(226, 55, 68, 0.3)'
                            }}>
                                <Clock size={20} color="#E23744" />
                            </div>
                        </div>
                    </div>

                    {/* Info Text */}
                    <p style={{
                        fontSize: '0.75rem',
                        color: '#6B7280',
                        marginTop: '1rem',
                        textAlign: 'center'
                    }}>
                        Orders can be placed 30 minutes to 6 hours in advance
                    </p>
                </div>
            </div>

            {/* Checkout Button */}
            <button
                onClick={handleCheckout}
                disabled={loading}
                style={{
                    background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
                    color: 'white',
                    border: 'none',
                    width: '100%',
                    padding: '1.2rem',
                    borderRadius: '24px',
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    opacity: loading ? 0.7 : 1,
                    boxShadow: '0 8px 20px rgba(226, 55, 68, 0.4)',
                    transition: 'transform 0.2s ease'
                }}
            >
                <span>{loading ? 'Processing...' : 'Place Order'}</span>
                <div style={{
                    background: 'rgba(255,255,255,0.2)',
                    borderRadius: '12px',
                    padding: '8px'
                }}>
                    <ArrowRight size={20} />
                </div>
            </button>
        </div>
    );
};

export default Cart;
