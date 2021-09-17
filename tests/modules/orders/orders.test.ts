import {OrderSummary, Order, IOrderService, PlaceOrder, CancelOrder, GetOrderSummary} from "../../../src";
import {OrderInMemoryMockService} from "../../mock/orderInMemoryMockService";

describe('OrderDomain', () => {
    let orderService: IOrderService;
    beforeEach(() => {
        orderService = new OrderInMemoryMockService([]);
    })
    describe('PlaceOrder', () => {
        it('should place buy order when added', () => {
            const placeOrder = new PlaceOrder(orderService);

            const buyOrder = placeOrder.execute(1, 1, 'Eth', 350.1, 13.6, true);

            expect(buyOrder).not.toBeNull();
        })

        it('should not place duplicate buy order with same id when added', () => {
            const placeOrder = new PlaceOrder(orderService);

            const buyOrder = placeOrder.execute(1, 1, 'Eth', 350.1, 13.6, true);
            const duplicateBuyOrder = placeOrder.execute(1, 1, 'Eth', 355.1, 13, true);

            expect(buyOrder).not.toBeNull();
            expect(duplicateBuyOrder).not.toBeNull();
            expect(duplicateBuyOrder.quantity).toEqual(buyOrder.quantity);
        })

        it('should place sell order when added', () => {
            const placeOrder = new PlaceOrder(orderService);

            const buyOrder = placeOrder.execute(1, 1, 'Eth', 350.1, 13.6, false);

            expect(buyOrder).not.toBeNull();
        })

        it('should not place duplicate sell order when added', () => {
            const placeOrder = new PlaceOrder(orderService);

            const buyOrder = placeOrder.execute(1, 1, 'Eth', 350.1, 13.6, false);
            const duplicateBuyOrder = placeOrder.execute(1, 1, 'Eth', 350.1, 13.6, false);

            expect(buyOrder).not.toBeNull();
            expect(duplicateBuyOrder).not.toBeNull();
            expect(duplicateBuyOrder.quantity).toEqual(buyOrder.quantity);
        })
    })

    describe('CancelOrder', () => {
        it('should cancel order and return true when exists', () => {
            const placeOrder = new PlaceOrder(orderService);

            const order = placeOrder.execute(1, 1, 'Eth', 350.1, 13.6, true);

            const cancelOrder = new CancelOrder(orderService);

            const cancel = cancelOrder.execute(order.id);

            expect(order).not.toBeNull();
            expect(cancel).toBeTruthy();
        })

        it('should not cancel order if it does not exists and return false', () => {
            const placeOrder = new PlaceOrder(orderService);

            const order = placeOrder.execute(1, 1, 'Eth', 350.1, 13.6, true);

            const cancelOrder = new CancelOrder(orderService);

            const cancel = cancelOrder.execute(2);

            expect(order).not.toBeNull();
            expect(cancel).toBeFalsy();
        })
    })

    describe('OrderSummary', () => {
        it('should get summary for the given sell orders', () => {

            const initialOrders: Order[] = [
                new Order(1, 1, 'Eth', 350.1, 13.6, false),
                new Order(2, 2, 'Eth', 50.5, 14, false),
                new Order(3, 3, 'Eth', 441.8, 13.9, false),
                new Order(4, 4, 'Eth', 3.5, 13.6, false),
            ];

            orderService = new OrderInMemoryMockService(initialOrders);

            const getOrderSummary = new GetOrderSummary(orderService);

            const summary = getOrderSummary.execute();

            expect(summary.buySummary).not.toBeNull();
            expect(summary.buySummary.length).toEqual(0);
            expect(summary.sellSummary.length).toEqual(3);
            expect(summary.sellSummary[0].price).toEqual(13.6);
            expect(summary.sellSummary[0].quantity).toEqual(353.6);
            expect(summary.sellSummary[1].price).toEqual(13.9);
            expect(summary.sellSummary[1].quantity).toEqual(441.8);
            expect(summary.sellSummary[2].price).toEqual(14);
            expect(summary.sellSummary[2].quantity).toEqual(50.5);
        })

        it('should get summary for the given buy orders', () => {
            const initialOrders: Order[] = [
                new Order(1, 1, 'Eth', 350.1, 13.6, true),
                new Order(2, 2, 'Eth', 50.5, 14, true),
                new Order(3, 3, 'Eth', 441.8, 13.9, true),
                new Order(4, 4, 'Eth', 3.5, 13.6, true),
            ];

            orderService = new OrderInMemoryMockService(initialOrders);
            const getOrderSummary = new GetOrderSummary(orderService);

            const summary = getOrderSummary.execute();

            expect(summary.sellSummary).not.toBeNull();
            expect(summary.sellSummary.length).toEqual(0);
            expect(summary.buySummary).not.toBeNull();
            expect(summary.buySummary.length).toEqual(3);
            expect(summary.buySummary[2].price).toEqual(13.6);
            expect(summary.buySummary[2].quantity).toEqual(353.6);
            expect(summary.buySummary[1].price).toEqual(13.9);
            expect(summary.buySummary[1].quantity).toEqual(441.8);
            expect(summary.buySummary[0].price).toEqual(14);
            expect(summary.buySummary[0].quantity).toEqual(50.5);
        })
    })
})
