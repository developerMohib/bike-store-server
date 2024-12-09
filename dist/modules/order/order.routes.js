"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRouter = void 0;
const express_1 = require("express");
const order_controller_1 = require("./order.controller");
const router = (0, express_1.Router)();
router.post('/orders', order_controller_1.createOrder);
router.get('/orders', order_controller_1.getOrders);
router.delete('/orders/:id', order_controller_1.deleteOrder);
// revenue
router.get('/revenue', order_controller_1.revenueCalculate);
// Export the router
exports.orderRouter = router;
