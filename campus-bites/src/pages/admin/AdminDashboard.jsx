import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, UtensilsCrossed, BarChart3, LogOut, ShieldCheck, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminDashboard = () => {
    const { logout, user } = useAuth();
    const location = useLocation();

    const isActive = (path) => location.pathname.includes(path);

    return (
        <div style={{
            display: 'flex',
            minHeight: '100vh',
            backgroundColor: '#0D0D0D',
            color: 'white',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Styles */}
            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-15px) rotate(5deg); }
                }
                .floating-emoji {
                    position: absolute;
                    font-size: 3rem;
                    opacity: 0.1;
                    pointer-events: none;
                    animation: float 7s ease-in-out infinite;
                }
                .nav-link {
                    display: flex;
                    align-items: center;
                    padding: 1rem 1.5rem;
                    margin-bottom: 0.5rem;
                    border-radius: 12px;
                    text-decoration: none;
                    font-weight: 500;
                    transition: all 0.3s ease;
                    color: #9CA3AF;
                }
                .nav-link:hover {
                    background: rgba(255, 255, 255, 0.05);
                    color: white;
                    transform: translateX(5px);
                }
                .nav-link.active {
                    background: linear-gradient(135deg, rgba(226, 55, 68, 0.15) 0%, rgba(226, 55, 68, 0.05) 100%);
                    color: #E23744;
                    border-left: 4px solid #E23744;
                }
                .glass-content {
                    background: rgba(26, 26, 28, 0.95);
                    border-radius: 24px;
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    min-height: calc(100vh - 4rem);
                    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
                }
                .sidebar {
                    width: 280px;
                    background: #111111;
                    padding: 2rem 1.5rem;
                    display: flex;
                    flex-direction: column;
                    border-right: 1px solid rgba(255, 255, 255, 0.05);
                    z-index: 100;
                }
            `}</style>

            {/* Background Decor */}
            <div className="floating-emoji" style={{ top: '10%', right: '5%' }}>🍕</div>
            <div className="floating-emoji" style={{ bottom: '15%', left: '20%', animationDelay: '2s' }}>🍜</div>

            {/* Sidebar */}
            <aside className="sidebar">
                <div style={{ marginBottom: '3rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                        <div style={{
                            background: '#E23744',
                            padding: '8px',
                            borderRadius: '12px',
                            boxShadow: '0 8px 20px rgba(226, 55, 68, 0.3)'
                        }}>
                            <ShieldCheck color="white" size={24} />
                        </div>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0, letterSpacing: '-1px' }}>Admin</h2>
                    </div>
                    <p style={{ color: '#6B7280', fontSize: '0.85rem', margin: 0 }}>Terminal Dashboard v2.0</p>
                </div>

                <nav style={{ flex: 1 }}>
                    <Link to="/admin/menu" className={`nav-link ${isActive('/admin/menu') ? 'active' : ''}`}>
                        <UtensilsCrossed size={20} style={{ marginRight: '1rem' }} /> Manage Menu
                    </Link>
                    <Link to="/admin/analytics" className={`nav-link ${isActive('/admin/analytics') ? 'active' : ''}`}>
                        <BarChart3 size={20} style={{ marginRight: '1rem' }} /> Analytics
                    </Link>
                </nav>

                <div style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem', padding: '0 0.5rem' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span style={{ fontWeight: 700, color: '#E23744' }}>{user?.name?.[0] || 'A'}</span>
                        </div>
                        <div style={{ overflow: 'hidden' }}>
                            <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 600, color: 'white', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.name || 'Administrator'}</p>
                            <p style={{ margin: 0, fontSize: '0.75rem', color: '#6B7280' }}>Master Access</p>
                        </div>
                    </div>
                    <button
                        onClick={logout}
                        style={{
                            display: 'flex', alignItems: 'center', width: '100%',
                            padding: '0.85rem 1rem', border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '12px', background: 'transparent',
                            color: '#F87171', cursor: 'pointer', fontSize: '0.9rem',
                            fontWeight: 600, transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(248, 113, 113, 0.05)'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                        <LogOut size={18} style={{ marginRight: '0.8rem' }} /> Logout System
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
                <div className="glass-content" style={{ padding: '2rem' }}>
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
