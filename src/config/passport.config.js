import passport from "passport";
import local from "passport-local";
import { usersManager } from "../dao/usersShema.js";
import { encryptPass, validPass } from "../utils/bcrypt.js";
import { Strategy as GithubStrategy } from "passport-github2";
import { Users } from "../models/entities/users.js";
import { ErrorLoginFailed } from "../models/errors/loginFailed.js";
import { Logger } from "../utils/winston.js";
import { usersRepository } from "../repositories/users.repository.js";

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
                const { user, pass, first_name, last_name, age, cart, role } =
                    req.body;
                const newUser = new Users({
                    user,
                    pass: encryptPass(pass),
                    first_name,
                    last_name,
                    age: parseInt(age),
                    cart,
                    role: "user",
                });
                /* console.log(newUser.dto()) */
                await usersManager.register(newUser.dto());
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
                const usersData = await usersManager.getAll();
                const exist = usersData.filter((x) => x.user == username);
                if (exist.length < 1)
                    throw new ErrorLoginFailed("El usuario no existe");
                console.log(exist[0].pass);
                console.log(validPass(exist[0].pass, req.body));
                if (!validPass(exist[0].pass, { pass: pass }))
                    throw new ErrorLoginFailed("Contraseña incorrecta");
                req.session.user = exist[0].user;
                usersRepository.updateOne({_id:exist[0]._id}, {last_connection: new Date})
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
                /* console.log(profile) */
                let user = await usersManager.getByUser(profile.username);
                if (!user) {
                    let newUser = {
                        user: profile.username,
                        pass: "",
                    };
                    let result = usersManager.register({
                        user: newUser.user,
                        pass: newUser.pass,
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

/* const secret = 'secreto'
passport.use('jwt', new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromExtractors([function (req) {
        let token = null
        if (req && req.signedCookies) {
            token = req.signedCookies['jwt_authorization']
        }
        return token
    }]),
    secretOrKey: secret,
}, async (jwt_payload, done) => {
    try {
        done(null, jwt_payload) // se guarda en el req.user
    } catch (error) {
        done(error)
    }
}))

export function authJwtApi(req, res, next) {
    passport.authenticate('jwt', (error, jwt_payload, info) => {
        if (error || !jwt_payload) return next(new Error('Error de autenticacion'))
        req.user = jwt_payload
        next(error)
    })(req, res, next)
}

export function authJwtView(req, res, next) {
    passport.authenticate('jwt', (error, jwt_payload) => {
        if (error || !jwt_payload) return res.redirect('/login')
        req.user = jwt_payload
        next(error)
    })(req, res, next)
} */
