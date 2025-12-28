const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { verifyUser, checkRole } = require('../middleware/auth');

// Place Order
router.post('/', verifyUser, async (req, res) => {
    try {
        const { items, totalAmount, pickupTime } = req.body;
        console.log('Placing Order - User:', req.user._id);
        console.log('Placing Order - Items:', JSON.stringify(items));
        console.log('Placing Order - Amount:', totalAmount);
        console.log('Placing Order - Pickup:', pickupTime);

        const order = new Order({
            user: req.user._id,
            items,
            totalAmount,
            pickupTime
        });

        await order.save();
        console.log('Order saved successfully:', order._id);
        res.status(201).json(order);
    } catch (err) {
        console.error('Error placing order:', err);
        res.status(500).json({ message: 'Error placing order', error: err.message });
    }
});

// Get My Orders
router.get('/mine', verifyUser, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id })
            .populate('items.product')
            .sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching orders' });
    }
});

// Get Active Orders (Staff/Admin)
router.get('/staff/active', verifyUser, checkRole(['admin', 'staff']), async (req, res) => {
    try {
        // Active = not completed or cancelled
        const orders = await Order.find({ status: { $nin: ['completed', 'cancelled'] } })
            .populate('items.product')
            .populate('user', 'name')
            .sort({ createdAt: 1 }); // Oldest first
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching active orders', error: err.message });
    }
});

// Update Order Status (Staff/Admin)
router.put('/:id/status', verifyUser, checkRole(['admin', 'staff']), async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
        res.json(order);
    } catch (err) {
        res.status(500).json({ message: 'Error updating order status', error: err.message });
    }
});

module.exports = router;
