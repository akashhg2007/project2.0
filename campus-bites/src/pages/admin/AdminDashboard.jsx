import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, UtensilsCrossed, BarChart3, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminDashboard = () => {
    const { logout } = useAuth();
    const location = useLocation();

    const isActive = (path) => location.pathname.includes(path);

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F3F4F6' }}>
            {/* Sidebar */}
            <aside style={{ width: '250px', backgroundColor: 'white', boxShadow: '2px 0 5px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ padding: '2rem', borderBottom: '1px solid #F3F4F6' }}>
                    <h2 style={{ color: '#EF4444', margin: 0 }}>Campus Bites</h2>
                    <span style={{ fontSize: '0.8rem', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '1px' }}>Admin Panel</span>
                </div>

                <nav style={{ flex: 1, padding: '1rem' }}>
                    <Link to="/admin/menu" style={{
                        display: 'flex', alignItems: 'center', padding: '1rem',
                        marginBottom: '0.5rem', borderRadius: '0.5rem',
                        backgroundColor: isActive('/admin/menu') ? '#FEF2F2' : 'transparent',
                        color: isActive('/admin/menu') ? '#EF4444' : '#4B5563',
                        textDecoration: 'none', fontWeight: 500
                    }}>
                        <UtensilsCrossed size={20} style={{ marginRight: '1rem' }} /> Menu Management
                    </Link>
                    <Link to="/admin/analytics" style={{
                        display: 'flex', alignItems: 'center', padding: '1rem',
                        marginBottom: '0.5rem', borderRadius: '0.5rem',
                        backgroundColor: isActive('/admin/analytics') ? '#FEF2F2' : 'transparent',
                        color: isActive('/admin/analytics') ? '#EF4444' : '#4B5563',
                        textDecoration: 'none', fontWeight: 500
                    }}>
                        <BarChart3 size={20} style={{ marginRight: '1rem' }} /> Analytics
                    </Link>
                </nav>

                <div style={{ padding: '1rem', borderTop: '1px solid #F3F4F6' }}>
                    <button
                        onClick={logout}
                        style={{
                            display: 'flex', alignItems: 'center', width: '100%',
                            padding: '1rem', border: 'none', background: 'transparent',
                            color: '#6B7280', cursor: 'pointer', fontSize: '1rem'
                        }}
                    >
                        <LogOut size={20} style={{ marginRight: '1rem' }} /> Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
                <Outlet />
            </main>
        </div>
    );
};

export default AdminDashboard;
