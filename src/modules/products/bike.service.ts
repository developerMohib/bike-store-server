import { IBike } from './bike.interface';
import { Product } from './bike.model';

const createProductService = async (data: IBike): Promise<IBike> => {
    const newProduct = new Product(data);
    const result = await newProduct.save();
    return result;
};

// get all products
const getProductService = async (): Promise<IBike[] | null> => {
    const result = await Product.find();
    return result;
};
export { createProductService, getProductService };
