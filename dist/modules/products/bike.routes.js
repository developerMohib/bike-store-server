"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bikeRouter = void 0;
const express_1 = require("express");
const bike_controller_1 = require("./bike.controller");
const router = (0, express_1.Router)();
router.post('/products', bike_controller_1.createProduct);
router.get('/products', bike_controller_1.getProductQuery);
router.get('/products/:productId', bike_controller_1.getSingleProduct);
router.put('/products/:productId', bike_controller_1.updateOneProduct);
router.delete('/products/:productId', bike_controller_1.deleteProduct);
// Export the router
exports.bikeRouter = router;
