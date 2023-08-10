import { usersRepository } from "../repositories/users.repository.js";

export class UsersService {
    constructor(usersRepository) {
        this.repo = usersRepository;
    }
    async changeRole(uid, role) {
        const userData = await this.repo.updateOne({ _id: uid }, { role });
        return userData;
    }
}

export const usersService = new UsersService(usersRepository);
