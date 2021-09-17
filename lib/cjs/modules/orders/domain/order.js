"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
var Order = /** @class */ (function () {
    function Order(id, userId, coinType, quantity, price, isBuy) {
        this.id = id;
        this.userId = userId;
        this.coinType = coinType;
        this.quantity = quantity;
        this.price = price;
        this.isBuy = isBuy;
    }
    return Order;
}());
exports.Order = Order;
