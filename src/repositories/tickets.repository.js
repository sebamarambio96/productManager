import { ticketsDaoMoongose } from "../dao/ticketsShema.js";
import { GenericRepository } from "./GenericRepository.js";

class TicketsRepository extends GenericRepository {
    constructor(dao) {
        super(dao);
    }
}

export const ticketsRepository = new TicketsRepository(ticketsDaoMoongose);
