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
exports.getProductService = exports.createProductService = void 0;
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
