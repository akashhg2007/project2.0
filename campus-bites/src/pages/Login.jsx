import React, { useState } from 'react'
import { UtensilsCrossed, Mail, Lock, ArrowRight } from 'lucide-react'
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
            background: '#0D0D0D',
            position: 'relative',
            overflow: 'hidden',
            color: 'white'
        }}>
            {/* Dark Mode Background Elements */}
            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(5deg); }
                }
                .floating-emoji {
                    position: absolute;
                    font-size: 4rem;
                    opacity: 0.2;
                    filter: blur(4px);
                    pointer-events: none;
                }
                .glass-card {
                    background: rgba(28, 28, 30, 0.6);
                    backdrop-filter: blur(20px);
                    border-radius: 2rem;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }
                .input-modern {
                    width: 100%;
                    padding: 1rem 1rem 1rem 3rem;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 1rem;
                    font-size: 1rem;
                    transition: all 0.3s ease;
                    background: rgba(255, 255, 255, 0.05);
                    color: white;
                }
                .input-modern:focus {
                    outline: none;
                    border-color: #E23744;
                    background: rgba(226, 55, 68, 0.05);
                }
                .btn-modern {
                    width: 100%;
                    padding: 1rem;
                    background: linear-gradient(135deg, #E23744 0%, #DC2626 100%);
                    color: white;
                    border: none;
                    border-radius: 1rem;
                    font-size: 1.1rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    box-shadow: 0 10px 30px rgba(226, 55, 68, 0.2);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                }
                .btn-modern:hover:not(:disabled) {
                    transform: translateY(-3px);
                    box-shadow: 0 15px 40px rgba(226, 55, 68, 0.3);
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
                    color: #9CA3AF;
                }
                .input-modern:focus + .icon-wrapper, .input-modern:focus ~ .icon-wrapper {
                    color: #E23744;
                }
            `}</style>

            <div className="floating-emoji" style={{ top: '10%', left: '10%', animation: 'float 6s ease-in-out infinite' }}>🍔</div>
            <div className="floating-emoji" style={{ bottom: '15%', right: '15%', animation: 'float 7s ease-in-out infinite' }}>🍕</div>

            {/* Main Login Card */}
            <div className="glass-card" style={{
                width: '90%',
                maxWidth: '420px',
                padding: '3rem 2rem',
                zIndex: 10
            }}>
                {/* Logo & Title */}
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <div style={{
                        width: '72px',
                        height: '72px',
                        background: 'linear-gradient(135deg, #E23744 0%, #DC2626 100%)',
                        borderRadius: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1.5rem',
                        transform: 'rotate(-5deg)',
                        boxShadow: '0 10px 30px rgba(226, 55, 68, 0.3)'
                    }}>
                        <UtensilsCrossed color="white" size={36} />
                    </div>

                    <h1 style={{
                        fontSize: '2rem',
                        fontWeight: 700,
                        marginBottom: '0.5rem',
                        letterSpacing: '-1px'
                    }}>Campus Bites</h1>
                    <p style={{ color: '#9CA3AF', fontSize: '0.95rem' }}>Your favorite canteen, now online</p>
                </div>

                {/* Error Message */}
                {error && (
                    <div style={{
                        color: '#F87171',
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        padding: '1rem',
                        borderRadius: '1rem',
                        marginBottom: '1.5rem',
                        fontSize: '0.9rem',
                        textAlign: 'center',
                        border: '1px solid rgba(239, 68, 68, 0.2)'
                    }}>{error}</div>
                )}

                {/* Login Form */}
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1.25rem', position: 'relative' }}>
                        <div className="icon-wrapper">
                            <Mail size={20} />
                        </div>
                        <input
                            type="email"
                            className="input-modern"
                            placeholder="Email Address"
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
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="btn-modern" disabled={loading}>
                        {loading ? 'Logging in...' : 'Sign In'} <ArrowRight size={20} />
                    </button>
                </form>

                {/* Register Link */}
                <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                    <p style={{ color: '#9CA3AF', fontSize: '0.9rem' }}>
                        New to Campus Bites?{' '}
                        <a href="/register" style={{
                            color: '#E23744',
                            fontWeight: 600,
                            textDecoration: 'none',
                        }}>
                            Create Account
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login
