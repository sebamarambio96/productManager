import { usersRepository } from "../repositories/users.repository.js";import { usersService } from "../services/users.service.js";
;

export async function changeRole(req, res, next) {
    try {
        const { uid } = req.params;
        //Verify existence of user
        const userData = await usersRepository.readOne({ _id: uid });
        const newRole = userData.role === "premium" ? "user" : "premium";
        usersService.changeRole(uid, newRole)
        res.status(200).json({ message: "Rol de usuario actualizado" });
    } catch (error) {
        next(error);
    }
}
