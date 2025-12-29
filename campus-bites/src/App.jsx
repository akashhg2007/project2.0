import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Menu from './pages/Menu'
import Cart from './pages/Cart'
import Orders from './pages/Orders'
import Profile from './pages/Profile'

// Admin & Staff
import AdminDashboard from './pages/admin/AdminDashboard'
import ManageMenu from './pages/admin/ManageMenu'
import KitchenView from './pages/staff/KitchenView'

// Protected Route Component
const ProtectedRoute = ({ children, roles }) => {
    const { user, loading } = useAuth();

    if (loading) return <div>Loading...</div>;

    if (!user) {
        return <Navigate to="/" replace />;
    }

    if (roles && !roles.includes(user.role)) {
        // Redirect based on role if they try to access unauthorized pages
        if (user.role === 'admin') return <Navigate to="/admin/menu" replace />;
        if (user.role === 'staff') return <Navigate to="/staff/kitchen" replace />;
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

function App() {
    return (
        <AuthProvider>
            <CartProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/register" element={<Register />} />

                        {/* Student Dashboard */}
                        <Route path="/dashboard" element={
                            <ProtectedRoute roles={['student']}>
                                <Dashboard />
                            </ProtectedRoute>
                        }>
                            <Route index element={<Navigate to="menu" replace />} />
                            <Route path="menu" element={<Menu />} />
                            <Route path="cart" element={<Cart />} />
                            <Route path="orders" element={<Orders />} />
                            <Route path="profile" element={<Profile />} />
                        </Route>

                        {/* Admin Dashboard */}
                        <Route path="/admin" element={
                            <ProtectedRoute roles={['admin']}>
                                <AdminDashboard />
                            </ProtectedRoute>
                        }>
                            <Route index element={<Navigate to="menu" replace />} />
                            <Route path="menu" element={<ManageMenu />} />
                            <Route path="analytics" element={<div className="p-4">Analytics Module Coming Soon</div>} />
                        </Route>

                        {/* Staff Dashboard */}
                        <Route path="/staff" element={
                            <ProtectedRoute roles={['staff']}>
                                <div style={{ minHeight: '100vh', background: '#F3F4F6' }}>
                                    <Outlet />
                                </div>
                            </ProtectedRoute>
                        }>
                            <Route path="kitchen" element={<KitchenView />} />
                            <Route index element={<Navigate to="kitchen" replace />} />
                        </Route>

                    </Routes>
                </Router>
            </CartProvider>
        </AuthProvider>
    )
}

export default App
