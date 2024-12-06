import { IBike, IError } from './bike.interface';
import { Product } from './bike.model';

const createProductService = async (data: IBike): Promise<IBike> => {
    try {
        const newProduct = new Product(data);
        const result = await newProduct.save();
        return result;
    } catch (error) {
        throw new Error((error as IError).message);
    }
};

// get all products
const getProductService = async (): Promise<IBike[] | null> => {
    try {
        const result = await Product.find();
        return result;
    } catch (error) {
        throw new Error((error as IError).message);
    }
};
export { createProductService, getProductService };
