import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { GoogleOAuthProvider } from '@react-oauth/google';

import { SpeedInsights } from "@vercel/speed-insights/react"

console.log('Campus Bites Version: 1.0.1 - Deployment Test');
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            <App />
            <SpeedInsights />
        </GoogleOAuthProvider>
    </React.StrictMode>,
)
