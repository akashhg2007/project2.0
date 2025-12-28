import React, { useState } from 'react'
import { UtensilsCrossed, ArrowLeft } from 'lucide-react'
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
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'radial-gradient(circle at center, #ffffff 0%, #FAF9F6 100%)'
        }}>
            {/* Branding Section */}
            <div className="text-center mb-4">
                <div style={{
                    width: '64px',
                    height: '64px',
                    background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1rem',
                    boxShadow: '0 4px 6px -1px rgba(239, 68, 68, 0.3)'
                }}>
                    <UtensilsCrossed color="white" size={32} />
                </div>
                <h1 style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>Campus Bites</h1>
                <p className="text-gray">Sign Up for Smart Dining</p>
            </div>

            {/* Register Card */}
            <div className="card" style={{ width: '100%', maxWidth: '400px' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                    <Link to="/" style={{ display: 'flex', alignItems: 'center', color: '#6B7280', fontSize: '0.875rem' }}>
                        <ArrowLeft size={16} style={{ marginRight: '0.25rem' }} /> Back
                    </Link>
                    <h2 style={{ fontSize: '1.5rem', flex: 1, textAlign: 'center', marginRight: '3rem' }}>Register</h2>
                </div>

                {error && <div style={{ color: '#EF4444', backgroundColor: '#FEE2E2', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1rem', fontSize: '0.875rem', textAlign: 'center' }}>{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label className="input-label" htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            className="input-field"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label className="input-label" htmlFor="email">College Email</label>
                        <input
                            type="email"
                            id="email"
                            className="input-field"
                            placeholder="your.email@college.edu"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label className="input-label" htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="input-field"
                            placeholder="Create a strong password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary mt-2" disabled={loading}>
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </button>
                </form>

                <div className="text-center mt-4">
                    <Link to="/" className="text-sm" style={{ color: '#EF4444', fontWeight: 500 }}>
                        Already have an account? Login
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Register
