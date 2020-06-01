const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/cheeck-auth');

const OrderController = require('../controllers/orders');

router.get('/', checkAuth, OrderController.orders_get_all);

router.post('/', OrderController.create_order);

router.get('/:orderId', OrderController.orders_get_orders);

router.patch('/:orderId', OrderController.order_update);

router.delete('/:orderId', OrderController.order_delete);

module.exports = router;
