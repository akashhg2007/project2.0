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

// Get Active & Recently Completed Orders (Staff/Admin)
router.get('/staff/active', verifyUser, checkRole(['admin', 'staff']), async (req, res) => {
    try {
        // Fetch all orders that are NOT cancelled
        // This includes pending, preparing, ready, and completed (til 24h TTL deletion)
        const orders = await Order.find({
            status: { $ne: 'cancelled' }
        })
            .populate('items.product')
            .populate('user', 'name')
            .sort({ createdAt: -1 }); // Newest first for easier history tracking

        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching active orders', error: err.message });
    }
});

// Update Order Status (Staff/Admin)
router.put('/:id/status', verifyUser, checkRole(['admin', 'staff']), async (req, res) => {
    try {
        const { status } = req.body;
        let update = { $set: { status } };

        // If status is completed, set it to expire in 24 hours
        if (status === 'completed') {
            update.$set.expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
        } else {
            // If moved away from completed (e.g. error correction), remove expiry
            update.$unset = { expiresAt: "" };
        }

        const order = await Order.findByIdAndUpdate(req.params.id, update, { new: true });
        res.json(order);
    } catch (err) {
        res.status(500).json({ message: 'Error updating order status', error: err.message });
    }
});

module.exports = router;
