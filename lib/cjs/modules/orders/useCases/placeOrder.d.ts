import { IOrderService } from "../services/orderService.interface";
import { Order } from "../domain";
export declare class PlaceOrder {
    private readonly orderService;
    constructor(orderService: IOrderService);
    execute(id: number, userId: number, coinType: string, quantity: number, price: number, isBuy: boolean): Order;
}
