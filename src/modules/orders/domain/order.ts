export class Order {
    constructor(id: number, userId: number, coinType: string, quantity: number, price: number, isBuy:boolean) {
        this.id = id;
        this.userId = userId;
        this.coinType = coinType;
        this.quantity = quantity;
        this.price = price;
        this.isBuy = isBuy;
    }

    id: number;
    userId: number;
    coinType: string;
    quantity: number;
    price: number;
    isBuy:boolean
}
