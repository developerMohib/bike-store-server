"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
        min: [0, 'Price must be a positive number'],
        trim: true,
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: {
            values: ['Mountain', 'Road', 'Hybrid', 'Electric'],
            message: '{VALUE} is not valid category. And the category are Mountain, Road, Hybrid, Electric',
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
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
// mongoose middleware
// pre --> for deleted user
productSchema.pre('find', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.find({ isDeleted: { $ne: true } });
        next();
    });
});
// aggregation --> spacific user find but deleted
productSchema.pre('aggregate', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const pipeline = this.pipeline();
        pipeline.unshift({ $match: { isDeleted: { $ne: true } } });
        next();
    });
});
const Product = (0, mongoose_1.model)('Product', productSchema);
exports.Product = Product;
