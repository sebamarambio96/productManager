import { ticketsRepository } from "../repositories/tickets.repository.js"

export class TicketsService {
    constructor(ticketsRepository) {
        this.repo = ticketsRepository
    }
}

export const ticketsService = new TicketsService(ticketsRepository)