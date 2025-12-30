import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { GoogleOAuthProvider } from '@react-oauth/google';

console.log('Campus Bites Version: 1.0.1 - Deployment Test');
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || '785669315584-m6060cqqk9nqrrbd6asjnd9j6vslm588.apps.googleusercontent.com'}>
            <App />
        </GoogleOAuthProvider>
    </React.StrictMode>,
)
