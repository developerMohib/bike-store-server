"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bikeRouter = void 0;
const express_1 = require("express");
const bike_controller_1 = require("./bike.controller");
const router = (0, express_1.Router)();
router.post('/api/products', bike_controller_1.createProduct);
router.get('/api/products', bike_controller_1.getProductQuery);
router.get('/api/products/:productId', bike_controller_1.getSingleProduct);
router.put('/api/products/:productId', bike_controller_1.updateOneProduct);
router.delete('/api/products/:productId', bike_controller_1.deleteProduct);
// Export the router
exports.bikeRouter = router;
