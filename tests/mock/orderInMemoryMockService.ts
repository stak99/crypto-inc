import {IOrderService} from "../../src/modules/orders/services/orderService.interface";
import {Order} from "../../src/modules/orders/domain";

export class OrderInMemoryMockService implements IOrderService {
    constructor(liveOrderBoard: Order[]) {
        this.liveOrderBoard = liveOrderBoard;
    }

    private liveOrderBoard: Order[];

    cancelOrder(id: number): boolean {
        if (!this.liveOrderBoard.some(o => o.id == id)) return false;

        this.liveOrderBoard = this.liveOrderBoard.filter(o => o.id == id);
        return true;
    }

    getOrder(id: number): Order {
        const order = this.liveOrderBoard.find(o => o.id == id);
        if (order == null) return null as any;

        return order;
    }

    getOrders(): Order[] {
        return this.liveOrderBoard;
    }

    placeOrder(order: Order): Order {
        this.liveOrderBoard.push(order);
        return order;
    }

}
