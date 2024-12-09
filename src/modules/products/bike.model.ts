import { Document, model, Schema } from 'mongoose';
import { IBike } from './bike.interface';

// Ensure that IBike extends Document for proper type inference
interface IProduct extends IBike, Document {}
const productSchema = new Schema<IProduct>(
    {
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
                message:
                    '{VALUE} is not valid category. And the category are Mountain, Road, Hybrid, Electric',
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
    },
    {
        timestamps: true,
    }
);

// mongoose middleware
// pre --> for deleted user
productSchema.pre('find', async function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

// aggregation --> spacific user find but deleted
productSchema.pre('aggregate', async function (next) {
    const pipeline = this.pipeline();
    pipeline.unshift({ $match: { isDeleted: { $ne: true } } });
    next();
});

const Product = model<IProduct>('Product', productSchema);

export { Product };
