import { GenericRepository } from "./GenericRepository.js";
import { usersDaoMoongose } from "../dao/usersShema.js";

class UsersRepository extends GenericRepository {
    constructor(dao) {
        super(dao);
    }
}

export const usersRepository = new UsersRepository(usersDaoMoongose);
