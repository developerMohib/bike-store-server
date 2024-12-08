"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        required: [true, 'Provide your Email, Email is required'],
        match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],
        immutable: true,
    },
    product: {
        type: mongoose_1.Schema.Types.ObjectId, // Reference to Product model
        ref: 'Product',
        trim: true,
        required: [true, 'Product name is required'],
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
        min: [1, 'Quantity must be at leatest 1'],
        trim: true,
    },
    totalPrice: {
        type: Number,
        required: [true, 'Total Price is required'],
        min: [0, 'Price Price should be a positive number'],
        trim: true,
    },
});
const Order = (0, mongoose_1.model)('Order', orderSchema);
exports.Order = Order;
