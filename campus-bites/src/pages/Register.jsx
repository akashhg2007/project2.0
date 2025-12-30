import React, { useState } from 'react'
import { UtensilsCrossed, User, Mail, Lock, ArrowLeft, ArrowRight } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

import API_URL from '../apiConfig';

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
            const res = await fetch(`${API_URL}/api/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password
                })
            });

            const data = await res.json();

            if (res.ok) {
                // Login immediately as verification is disabled
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
            background: '#0D0D0D',
            position: 'relative',
            overflow: 'hidden',
            color: 'white'
        }}>
            {/* Styles */}
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
                    box-sizing: border-box;
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
                    box-sizing: border-box;
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
                .back-link {
                    display: inline-flex;
                    align-items: center;
                    color: #9CA3AF;
                    text-decoration: none;
                    font-weight: 500;
                    margin-bottom: 2rem;
                    transition: all 0.3s ease;
                    font-size: 0.9rem;
                }
                .back-link:hover {
                    color: white;
                    transform: translateX(-5px);
                }
            `}</style>

            <div className="floating-emoji" style={{ top: '15%', left: '8%', animation: 'float 6s ease-in-out infinite' }}>🌮</div>
            <div className="floating-emoji" style={{ bottom: '20%', right: '12%', animation: 'float 7s ease-in-out infinite' }}>🍟</div>

            {/* Main Register Card */}
            <div className="glass-card" style={{
                width: '90%',
                maxWidth: '450px',
                padding: '3rem 2rem',
                zIndex: 10
            }}>
                <Link to="/" className="back-link">
                    <ArrowLeft size={18} style={{ marginRight: '0.5rem' }} />
                    Back to Login
                </Link>

                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h1 style={{
                        fontSize: '2rem',
                        fontWeight: 700,
                        marginBottom: '0.5rem',
                        letterSpacing: '-1px'
                    }}>Join Campus Bites</h1>
                    <p style={{ color: '#9CA3AF', fontSize: '0.95rem' }}>Create your account to get started</p>
                </div>

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

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1.25rem', position: 'relative' }}>
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

                    <div style={{ marginBottom: '1.25rem', position: 'relative' }}>
                        <div className="icon-wrapper">
                            <Mail size={20} />
                        </div>
                        <input
                            type="email"
                            className="input-modern"
                            placeholder="Email Address"
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
                            placeholder="Create Password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                        />
                    </div>

                    <button type="submit" className="btn-modern" disabled={loading}>
                        {loading ? 'Creating Account...' : 'Create Account'} <ArrowRight size={20} />
                    </button>
                </form>

                <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                    <p style={{ color: '#9CA3AF', fontSize: '0.9rem' }}>
                        Already have an account?{' '}
                        <Link to="/" style={{
                            color: '#E23744',
                            fontWeight: 600,
                            textDecoration: 'none',
                        }}>
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Register
