"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaceOrder = void 0;
var domain_1 = require("../domain");
var PlaceOrder = /** @class */ (function () {
    function PlaceOrder(orderService) {
        this.orderService = orderService;
    }
    PlaceOrder.prototype.execute = function (id, userId, coinType, quantity, price, isBuy) {
        var order = this.orderService.getOrder(id);
        if (order != null)
            return order;
        order = new domain_1.Order(id, userId, coinType, quantity, price, isBuy);
        return this.orderService.placeOrder(order);
    };
    return PlaceOrder;
}());
exports.PlaceOrder = PlaceOrder;
