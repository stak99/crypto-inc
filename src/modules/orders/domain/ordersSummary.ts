import {OrderSummary} from "./orderSummary";

export class OrdersSummary {
    constructor(buySummary: OrderSummary[], sellSummary: OrderSummary[]) {
        this.buySummary = buySummary;
        this.sellSummary = sellSummary;
    }

    buySummary: OrderSummary[];
    sellSummary: OrderSummary[];
}