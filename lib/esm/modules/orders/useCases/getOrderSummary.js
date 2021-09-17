"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetOrderSummary = void 0;
var domain_1 = require("../domain");
var _ = __importStar(require("lodash"));
var GetOrderSummary = /** @class */ (function () {
    function GetOrderSummary(orderService) {
        this.orderService = orderService;
    }
    GetOrderSummary.prototype.execute = function () {
        var orders = this.orderService.getOrders();
        return new domain_1.OrdersSummary(this.MergeOrders(orders.filter(function (o) { return o.isBuy; }), false), this.MergeOrders(orders.filter(function (o) { return !o.isBuy; }), true));
    };
    /**
     * As per the given specifications, it is not clear that whether or not orders
     * of same/different coin type to be merged.
     * For the purpose of the test, coin types are ignored but in real world scenario,
     * the coin type should be grouped by.
     *
     * @param orders
     * @param sortAsc
     * @constructor
     * @private
     */
    GetOrderSummary.prototype.MergeOrders = function (orders, sortAsc) {
        return _.chain(orders)
            .groupBy(function (o) { return o.price; })
            .map(function (ordersToBeMerged, nnn, mmm) {
            var quantity = ordersToBeMerged.reduce(function (a, b) { return (a + b.quantity); }, 0);
            var currentPrice = ordersToBeMerged[0].price;
            var orderSummary = new domain_1.OrderSummary("", quantity, currentPrice);
            return orderSummary;
        })
            .sort(function (a, b) { return sortAsc ? a.price - b.price : b.price - a.price; })
            .value();
    };
    return GetOrderSummary;
}());
exports.GetOrderSummary = GetOrderSummary;
