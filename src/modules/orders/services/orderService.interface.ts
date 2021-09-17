import {Order} from "../domain";

export interface IOrderService {

    placeOrder(order: Order): Order;

    getOrder(id: number): Order;

    cancelOrder(id: number): boolean;

    getOrders(): Order[];
}
