import { IOrderService } from "../services/orderService.interface";
import { OrdersSummary } from "../domain";
export declare class GetOrderSummary {
    private readonly orderService;
    constructor(orderService: IOrderService);
    execute(): OrdersSummary;
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
    private MergeOrders;
}
