import { IOrderService } from "../services/orderService.interface";
export declare class CancelOrder {
    private readonly orderService;
    constructor(orderService: IOrderService);
    execute(id: number): boolean;
}
