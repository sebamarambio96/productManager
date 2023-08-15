import { randomString } from "../../utils/randomUUID.js";
import { notEmpty } from "../validations/input.js";
import { validateNum } from "../validations/number.js";
import { validateString } from "../validations/string.js";

export class Tickets {
    #code;
    #purchase_datetime;
    #amount;
    #purchaser;

    constructor({ amount, purchaser }) {
        this.#code = randomString();
        this.#purchase_datetime = notEmpty(new Date());
        this.#amount = validateNum(amount);
        this.#purchaser = validateString(purchaser);
    }

    get code() {
        return this.#code;
    }
    get purchase_datetime() {
        return this.#purchase_datetime;
    }
    get amount() {
        return this.#amount;
    }
    get purchaser() {
        return this.#purchaser;
    }

    dto() {
        return {
            code: this.#code,
            purchase_datetime: this.#purchase_datetime,
            amount: this.#amount,
            purchaser: this.#purchaser,
        };
    }
}
