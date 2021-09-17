import {IOrderService} from "../services/orderService.interface";
import {Order} from "../domain";

export class PlaceOrder {
    public constructor(private readonly orderService: IOrderService) {
    }

    execute(id: number, userId: number, coinType: string, quantity: number, price: number, isBuy: boolean): Order {
        let order = this.orderService.getOrder(id);

        if (order != null) return order;

        order = new Order(id, userId, coinType, quantity, price, isBuy);

        return this.orderService.placeOrder(order);
    }
}
