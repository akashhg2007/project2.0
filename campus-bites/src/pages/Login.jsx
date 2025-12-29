import React, { useState, useEffect } from 'react'
import { UtensilsCrossed, Mail, Lock } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (res.ok) {
                login(data.user);
                if (data.user.role === 'admin') navigate('/admin/menu');
                else if (data.user.role === 'staff') navigate('/staff/kitchen');
                else navigate('/dashboard/menu');
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            setError('Server connection error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes slideUp {
                    from { transform: translateY(100px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                @keyframes pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                }
                @keyframes shimmer {
                    0% { background-position: -1000px 0; }
                    100% { background-position: 1000px 0; }
                }
                .login-container {
                    animation: fadeIn 0.8s ease;
                }
                .food-image {
                    animation: slideUp 1s ease;
                }
                .input-modern {
                    width: 100%;
                    padding: 1rem 1rem 1rem 3rem;
                    border: 2px solid rgba(255, 255, 255, 0.3);
                    border-radius: 1rem;
                    font-size: 1rem;
                    transition: all 0.3s ease;
                    background: rgba(255, 255, 255, 0.95);
                }
                .input-modern:focus {
                    outline: none;
                    border-color: white;
                    box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.2);
                    transform: translateY(-2px);
                }
                .btn-modern {
                    width: 100%;
                    padding: 1rem;
                    background: white;
                    color: #EF4444;
                    border: none;
                    border-radius: 1rem;
                    font-size: 1.1rem;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                }
                .btn-modern:hover:not(:disabled) {
                    transform: translateY(-3px);
                    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
                }
                .btn-modern:disabled {
                    opacity: 0.7;
                    cursor: not-allowed;
                }
                .icon-wrapper {
                    position: absolute;
                    left: 1rem;
                    top: 50%;
                    transform: translateY(-50%);
                    color: #EF4444;
                }
                .promo-badge {
                    background: white;
                    color: #EF4444;
                    padding: 0.5rem 1.5rem;
                    border-radius: 2rem;
                    font-weight: 600;
                    font-size: 0.9rem;
                    display: inline-block;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                    animation: pulse 2s ease-in-out infinite;
                }
            `}</style>

            {/* Main Container */}
            <div className="login-container" style={{
                width: '90%',
                maxWidth: '450px',
                position: 'relative',
                zIndex: 10
            }}>
                {/* Promo Badge */}
                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                    <div className="promo-badge">
                        🎉 First Order - Free Delivery!
                    </div>
                </div>

                {/* Welcome Title */}
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h1 style={{
                        fontSize: '3rem',
                        fontWeight: 800,
                        color: 'white',
                        marginBottom: '0.5rem',
                        textShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                        lineHeight: 1.2
                    }}>
                        Welcome to<br />Campus Bites
                    </h1>
                </div>

                {/* Food Image */}
                <div className="food-image" style={{
                    width: '100%',
                    height: '300px',
                    marginBottom: '2rem',
                    position: 'relative'
                }}>
                    <img
                        src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=80"
                        alt="Delicious Burger"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.4))'
                        }}
                    />
                </div>

                {/* Login Form Card */}
                <div style={{
                    background: 'rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '2rem',
                    padding: '2rem',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
                }}>
                    {/* Error Message */}
                    {error && (
                        <div style={{
                            color: '#DC2626',
                            backgroundColor: '#FEE2E2',
                            padding: '1rem',
                            borderRadius: '1rem',
                            marginBottom: '1.5rem',
                            fontSize: '0.9rem',
                            textAlign: 'center',
                            border: '1px solid #FCA5A5'
                        }}>{error}</div>
                    )}

                    {/* Login Form */}
                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '1.5rem', position: 'relative' }}>
                            <div className="icon-wrapper">
                                <Mail size={20} />
                            </div>
                            <input
                                type="email"
                                className="input-modern"
                                placeholder="your.email@college.edu"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div style={{ marginBottom: '2rem', position: 'relative' }}>
                            <div className="icon-wrapper">
                                <Lock size={20} />
                            </div>
                            <input
                                type="password"
                                className="input-modern"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button type="submit" className="btn-modern" disabled={loading}>
                            {loading ? 'Logging in...' : 'Continue with Email'}
                        </button>
                    </form>

                    {/* Register Link */}
                    <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                        <p style={{ color: 'white', fontSize: '0.9rem', fontWeight: 500 }}>
                            Don't have an account?{' '}
                            <a href="/register" style={{
                                color: 'white',
                                fontWeight: 700,
                                textDecoration: 'underline',
                                transition: 'all 0.3s ease'
                            }}>
                                Register Now
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
