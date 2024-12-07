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
exports.getOrderService = exports.createOrderService = void 0;
const order_model_1 = require("./order.model");
const createOrderService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newOrder = new order_model_1.Order(data);
        const result = yield newOrder.save();
        return result;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.createOrderService = createOrderService;
// get all products
const getOrderService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield order_model_1.Order.find();
        return result;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.getOrderService = getOrderService;
