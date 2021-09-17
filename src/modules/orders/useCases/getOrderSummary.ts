import {IOrderService} from "../services/orderService.interface";
import {Order,OrderSummary, OrdersSummary} from "../domain";
import * as _ from "lodash";

export class GetOrderSummary {
    public constructor(private readonly orderService: IOrderService) {
    }

    execute(): OrdersSummary{
        const orders = this.orderService.getOrders();

        return  new OrdersSummary(
            this.MergeOrders(orders.filter(o=> o.isBuy), false),
            this.MergeOrders(orders.filter(o=> !o.isBuy), true)
        );
    }

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
    private MergeOrders(orders: Order[], sortAsc: boolean): OrderSummary[] {
        return _.chain(orders)
            .groupBy(o => o.price)
            .map((ordersToBeMerged: Order[], nnn, mmm): OrderSummary => {
                const quantity = ordersToBeMerged.reduce((a, b) => (a + b.quantity), 0);
                const currentPrice = ordersToBeMerged[0].price;
                const orderSummary = new OrderSummary("", quantity, currentPrice);
                return orderSummary;
            })
            .sort((a, b) => sortAsc ? a.price - b.price : b.price - a.price)
            .value();
    }
}
