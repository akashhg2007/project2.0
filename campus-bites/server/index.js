require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/campus-bites';

// Validate MongoDB URI
if (!mongoURI.startsWith('mongodb://') && !mongoURI.startsWith('mongodb+srv://')) {
    console.error('ERROR: Invalid MONGO_URI format. Must start with mongodb:// or mongodb+srv://');
    console.error('Current MONGO_URI:', mongoURI);
    process.exit(1);
}

console.log('Attempting to connect to MongoDB...');
console.log('MongoDB URI format:', mongoURI.split('@')[0] + '@***'); // Log without exposing password

mongoose.connect(mongoURI, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
})
    .then(() => console.log('MongoDB Connected Successfully'))
    .catch(err => {
        console.error('MongoDB Connection Error Details:');
        console.error('Name:', err.name);
        console.error('Message:', err.message);
        console.error('Code:', err.code);
        console.error('Please check your MONGO_URI environment variable');
    });

// Routes
app.get('/', (req, res) => {
    res.send('Campus Bites API is running');
});

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
