import {IOrderService} from "../services/orderService.interface";

export class CancelOrder {
    public constructor(private readonly orderService: IOrderService) {
    }

    execute(id: number): boolean{
        let order = this.orderService.getOrder(id);

        if (order == null) return false;

        return this.orderService.cancelOrder(id);
    }
}
