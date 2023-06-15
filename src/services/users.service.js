import { usersRepository } from "../repositories/users.repository.js"

export class UsersService {
    constructor(usersRepository) {
        this.repo = usersRepository
    }
}

export const usersService = new UsersService(usersRepository)
