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
exports.updateProductService = exports.getSingleProductService = exports.getProductService = exports.createProductService = void 0;
const mongoose_1 = require("mongoose");
const bike_model_1 = require("./bike.model");
const createProductService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newProduct = new bike_model_1.Product(data);
        const result = yield newProduct.save();
        return result;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.createProductService = createProductService;
// get all products
const getProductService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield bike_model_1.Product.find();
        return result;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.getProductService = getProductService;
// get all products
const getSingleProductService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const objectId = new mongoose_1.Types.ObjectId(id);
        const result = yield bike_model_1.Product.aggregate([{ $match: { _id: objectId } }]);
        return result;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.getSingleProductService = getSingleProductService;
// get all products
const updateProductService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const objectId = new mongoose_1.Types.ObjectId(id);
        const result = yield bike_model_1.Product.findByIdAndUpdate(objectId, data, {
            new: true,
            runValidators: true,
        });
        return result;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.updateProductService = updateProductService;
