"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CancelOrder = void 0;
var CancelOrder = /** @class */ (function () {
    function CancelOrder(orderService) {
        this.orderService = orderService;
    }
    CancelOrder.prototype.execute = function (id) {
        var order = this.orderService.getOrder(id);
        if (order == null)
            return false;
        return this.orderService.cancelOrder(id);
    };
    return CancelOrder;
}());
exports.CancelOrder = CancelOrder;
