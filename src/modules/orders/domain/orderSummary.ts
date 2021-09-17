export class OrderSummary{
    constructor(coin:string, quantity: number, price: number) {
        this.coin = coin;
        this.quantity = quantity;
        this.price = price;
    }

    coin:string;
    quantity: number;
    price: number;
}
