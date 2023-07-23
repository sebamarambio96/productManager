import bcrypt, { genSaltSync } from "bcrypt";

export function encryptPass(pass) {
    return bcrypt.hashSync(pass, genSaltSync(10));
}

export function validPass(hashPass, user) {
    return bcrypt.compareSync(user.pass, hashPass);
}
