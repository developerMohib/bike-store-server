"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true,
        minlength: [3, 'Product name must be at least 3 characters long'],
        maxlength: [
            100,
            'Product name should be more than 100 characters long',
        ],
    },
    brand: {
        type: String,
        required: [true, 'Product brand name is required'],
        trim: true,
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price should be positive number'],
        trim: true,
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: {
            values: ['Mountain', 'Road', 'Hybrid', 'Electric'],
            message: '{VALUE} is not valid category',
        },
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true,
        maxlength: [
            500,
            'Description should not be more than 500 charecters',
        ],
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
        min: [0, 'Quantity should be positive number'],
        trim: true,
    },
    inStock: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
});
const Product = (0, mongoose_1.model)('Product', productSchema);
exports.Product = Product;
