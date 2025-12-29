import React, { useState } from 'react'
import { UtensilsCrossed, User, Mail, Lock, ArrowLeft } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (res.ok) {
                login(data.user);
                navigate('/dashboard/menu');
            } else {
                setError(data.message || 'Registration failed');
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
            background: 'linear-gradient(135deg, #FF6B35 0%, #FF8E53 50%, #FFA07A 100%)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Animated Background Elements */}
            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(5deg); }
                }
                @keyframes float2 {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-30px) rotate(-5deg); }
                }
                @keyframes float3 {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-25px) rotate(3deg); }
                }
                @keyframes pulse {
                    0%, 100% { transform: scale(1); opacity: 0.6; }
                    50% { transform: scale(1.1); opacity: 0.8; }
                }
                .floating-food {
                    position: absolute;
                    font-size: 4rem;
                    opacity: 0.15;
                    pointer-events: none;
                }
                .glass-card {
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(20px);
                    border-radius: 2rem;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                    border: 1px solid rgba(255, 255, 255, 0.3);
                }
                .input-modern {
                    width: 100%;
                    padding: 1rem 1rem 1rem 3rem;
                    border: 2px solid rgba(239, 68, 68, 0.2);
                    border-radius: 1rem;
                    font-size: 1rem;
                    transition: all 0.3s ease;
                    background: rgba(255, 255, 255, 0.9);
                }
                .input-modern:focus {
                    outline: none;
                    border-color: #EF4444;
                    box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.1);
                    transform: translateY(-2px);
                }
                .btn-modern {
                    width: 100%;
                    padding: 1rem;
                    background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%);
                    color: white;
                    border: none;
                    border-radius: 1rem;
                    font-size: 1.1rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    box-shadow: 0 10px 30px rgba(239, 68, 68, 0.3);
                }
                .btn-modern:hover:not(:disabled) {
                    transform: translateY(-3px);
                    box-shadow: 0 15px 40px rgba(239, 68, 68, 0.4);
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
                .back-link {
                    display: inline-flex;
                    align-items: center;
                    color: #EF4444;
                    text-decoration: none;
                    font-weight: 600;
                    margin-bottom: 1.5rem;
                    transition: all 0.3s ease;
                }
                .back-link:hover {
                    transform: translateX(-5px);
                }
            `}</style>

            {/* Floating Food Emojis */}
            <div className="floating-food" style={{ top: '10%', left: '10%', animation: 'float 6s ease-in-out infinite' }}>🍔</div>
            <div className="floating-food" style={{ top: '20%', right: '15%', animation: 'float2 7s ease-in-out infinite' }}>🍕</div>
            <div className="floating-food" style={{ bottom: '15%', left: '15%', animation: 'float3 8s ease-in-out infinite' }}>🍟</div>
            <div className="floating-food" style={{ bottom: '25%', right: '10%', animation: 'float 9s ease-in-out infinite' }}>🥤</div>
            <div className="floating-food" style={{ top: '50%', left: '5%', animation: 'float2 7.5s ease-in-out infinite' }}>🌮</div>
            <div className="floating-food" style={{ top: '60%', right: '8%', animation: 'float3 6.5s ease-in-out infinite' }}>🍰</div>

            {/* Main Register Card */}
            <div className="glass-card" style={{
                width: '90%',
                maxWidth: '450px',
                padding: '3rem 2.5rem',
                animation: 'float 3s ease-in-out infinite',
                zIndex: 10
            }}>
                {/* Back Link */}
                <Link to="/" className="back-link">
                    <ArrowLeft size={20} style={{ marginRight: '0.5rem' }} />
                    Back to Login
                </Link>

                {/* Logo & Title */}
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <div style={{
                        width: '80px',
                        height: '80px',
                        background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1.5rem',
                        boxShadow: '0 10px 30px rgba(239, 68, 68, 0.4)',
                        animation: 'pulse 2s ease-in-out infinite'
                    }}>
                        <UtensilsCrossed color="white" size={40} />
                    </div>
                    <h1 style={{
                        fontSize: '2rem',
                        color: '#1F2937',
                        fontWeight: 700,
                        marginBottom: '0.5rem'
                    }}>Join Campus Bites</h1>
                    <p style={{ color: '#6B7280', fontSize: '0.95rem' }}>Create your account to get started</p>
                </div>

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

                {/* Register Form */}
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1.5rem', position: 'relative' }}>
                        <div className="icon-wrapper">
                            <User size={20} />
                        </div>
                        <input
                            type="text"
                            className="input-modern"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                    </div>

                    <div style={{ marginBottom: '1.5rem', position: 'relative' }}>
                        <div className="icon-wrapper">
                            <Mail size={20} />
                        </div>
                        <input
                            type="email"
                            className="input-modern"
                            placeholder="your.email@college.edu"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                            placeholder="Create a strong password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                        />
                    </div>

                    <button type="submit" className="btn-modern" disabled={loading}>
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </button>
                </form>

                {/* Login Link */}
                <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                    <p style={{ color: '#6B7280', fontSize: '0.9rem' }}>
                        Already have an account?{' '}
                        <Link to="/" style={{
                            color: '#EF4444',
                            fontWeight: 600,
                            textDecoration: 'none',
                            transition: 'all 0.3s ease'
                        }}>
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Register
