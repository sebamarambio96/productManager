import { cartsDaoMoongose } from "../dao/cartsShema.js";
import { productsDaoMoongose } from "../dao/productsShema.js";
import { cartsRepository } from "../repositories/carts.repository.js";
import { ticketsRepository } from "../repositories/tickets.repository.js";
import { randomString } from "../utils/randomUUID.js";

export class TicketsService {
    constructor(ticketsRepository) {
        this.repo = ticketsRepository;
    }
    async verifyStock(cid) {
        const cartData = await cartsDaoMoongose.readOnePopulated({ _id: cid }, "cartProducts.product");
        // VERIFY EXISTENCE of product
        if (!cartData) throw new Error("ID no existe");
        //Divide products in 2 arrays
        const inStock = [];
        const noStock = [];
        cartData.cartProducts.forEach((product) => {
            if (product.product.stock >= product.quantity) {
                inStock.push(product);
            } else {
                noStock.push(product);
            }
        });
        //Return 2 arrays with products in stock and products out of stock, respectively.
        return { inStock, noStock };
    }
    async purchase(cid, purchaser, role) {
        const { inStock, noStock } = await this.verifyStock(cid);
        /* console.log(inStock); */

        //Calculate amount of purchase and discount stock
        let amount = 0;
        inStock.map((product) => {
            //Validate if purchaser isn't owner of product
            /* console.log(product.product?.owner); */
            console.log(purchaser);
            if (product.product.owner == purchaser && role == "premium") throw new Error(`No puedes comprar este producto porque eres el dueño: "${product.product.title}"`);
            amount += product.quantity * product.product.price;
            productsDaoMoongose.updateOne({ _id: product.product._id }, { stock: product.product.stock - product.quantity });
        });
        /* console.log(amount); */
        //Create a new ticket with valid stock
        const newTicket = await this.repo.create({
            code: randomString(),
            purchase_datetime: new Date(),
            amount,
            purchaser,
        });
        //Update
        cartsRepository.updateOne({ _id: cid }, { cartProducts: noStock });

        return { newTicket, noStock };
    }
}

export const ticketsService = new TicketsService(ticketsRepository);
