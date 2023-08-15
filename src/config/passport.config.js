import passport from "passport";
import local from "passport-local";
import { encryptPass, validPass } from "../utils/bcrypt.js";
import { Strategy as GithubStrategy } from "passport-github2";
import { Users } from "../models/entities/users.js";
import { ErrorLoginFailed } from "../models/errors/loginFailed.js";
import { Logger } from "../utils/winston.js";
import { usersRepository } from "../repositories/users.repository.js";
import { randomString } from "../utils/randomUUID.js";

const LocalStrategy = local.Strategy;

passport.use(
    "register",
    new LocalStrategy(
        {
            passReqToCallback: true,
            usernameField: "user",
            passwordField: "pass",
        },
        async (req, _u, _p, done) => {
            try {
                const { user, pass, first_name, last_name, age, cart } = req.body;
                const newUser = new Users({
                    user,
                    pass: encryptPass(pass),
                    first_name,
                    last_name,
                    age: parseInt(age),
                    cart,
                    role: "user",
                });
                await usersRepository.create({ ...newUser.dto() });
                done(null, { user, pass });
            } catch (error) {
                return done(error);
            }
        }
    )
);

passport.use(
    "login",
    new LocalStrategy(
        {
            passReqToCallback: true,
            usernameField: "username",
            passwordField: "pass",
        },
        async (req, _u, _p, done) => {
            try {
                const { username, pass } = req.body;
                Logger.silly({ username, pass });
                const usersData = await usersRepository.readMany({});
                const exist = usersData.filter((x) => x.user == username);
                if (exist.length < 1) throw new ErrorLoginFailed("El usuario no existe");
                if (!validPass(exist[0].pass, { pass: pass })) throw new ErrorLoginFailed("Contraseña incorrecta");
                req.session.user = exist[0].user;
                usersRepository.updateOne({ _id: exist[0]._id }, { last_connection: new Date() });
                done(null, exist[0]);
            } catch (error) {
                return done(error);
            }
        }
    )
);

passport.use(
    "github",
    new GithubStrategy(
        {
            clientID: "Iv1.06228b278462ca87",
            clientSecret: "8162d55f92f14efdfe0e568aa25a49a15fd7e94b",
            callbackURL: "http://localhost:8080/profile/sessionGitHub",
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await usersRepository.readOne({ user: profile.username }, false);
                if (!user) {
                    const fullName = profile.displayName;
                    const nameParts = fullName.split(" ");
                    const first_name = nameParts[0];
                    const last_name = nameParts.slice(1).join(" ");

                    let result = usersRepository.create({
                        user: profile.username,
                        pass: encryptPass(randomString()),
                        first_name,
                        last_name
                    });

                    done(null, result);
                } else {
                    done(null, { user: "seba" });
                }
            } catch (error) {
                return done(error);
            }
        }
    )
);
/*  */
passport.serializeUser((user, next) => {
    next(null, user);
});
passport.deserializeUser((user, next) => {
    next(null, user);
});

export const passportInit = passport.initialize();
export const passportSession = passport.session();

export const autenticacionPorGithub = passport.authenticate("github", {
    session: false,
    scope: ["user:email"],
});
export const autenticacionPorGithub_CB = passport.authenticate("github", {
    session: false,
    failWithError: true,
});