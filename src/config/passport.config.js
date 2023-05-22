import passport, { Passport } from 'passport'
import local from 'passport-local'
import { usersManager } from "../dao/models/usersShema.js"
import { encryptPass, validPass } from "../utils/bcrypt.js"
import { Strategy as GithubStrategy } from 'passport-github2'

const LocalStrategy = local.Strategy


passport.use('register', new LocalStrategy({
    passReqToCallback: true,
    usernameField: 'user',
    passwordField: 'pass'
}, async (req, _u, _p, done) => {
    const { user, pass, first_name, last_name, age, cart, role } = req.body
    console.log(user, pass)
    await usersManager.register({ user, pass: encryptPass(pass), first_name, last_name, age, cart, role })
    done(null, { user, pass })
})
)

passport.use('login', new LocalStrategy({
    passReqToCallback: true,
    usernameField: 'username',
    passwordField: 'pass'
}, async (req, _u, _p, done) => {
    try {
        const { username, pass } = req.body
        /* console.log(username, pass) */
        const usersData = await usersManager.getAll()
        const exist = usersData.filter(x => x.user == username)
        if (exist.length < 1) throw new Error('Login Fail')
        if (username == 'adminCoder@coder.com' && pass == 'adminCod3r123') {
            req.session.admin = true
            req.session.user = 'adminCoder@coder.com'
            done(null, { user: 'adminCoder@coder.com', pass: 'adminCod3r123' })
        } else if (validPass(pass, exist[0])) {
            req.session.admin = false
            req.session.user = exist[0].user
            done(null, exist[0])
        }
    } catch (error) {
        return done(error)
    }

})
)

passport.use('github', new GithubStrategy({
    clientID: "Iv1.06228b278462ca87",
    clientSecret: "8162d55f92f14efdfe0e568aa25a49a15fd7e94b",
    callbackURL: "http://localhost:8080/profile/sessionGitHub",
}, async (accessToken, refreshToken, profile, done) => {
    try {
        /* console.log(profile) */
        let user = await usersManager.getByUser(profile.username)
        if (!user) {
            let newUser = {
                user: profile.username,
                pass: ''
            }
            let result = usersManager.register({ user: newUser.user, pass: newUser.pass })

            done(null, result)
        } else {

            done(null, { user: 'seba' })
        }
    } catch (error) {
        return done(error)
    }
})
)
/*  */
passport.serializeUser((user, next) => { next(null, user) })
passport.deserializeUser((user, next) => { next(null, user) })

export const passportInit = passport.initialize()
export const passportSession = passport.session()

export const autenticacionPorGithub = passport.authenticate('github', { session: false, scope: ['user:email'] })
export const autenticacionPorGithub_CB = passport.authenticate('github', { session: false, failWithError: true })


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
        next()
    })(req, res, next)
}

export function authJwtView(req, res, next) {
    passport.authenticate('jwt', (error, jwt_payload) => {
        if (error || !jwt_payload) return res.redirect('/login')
        req.user = jwt_payload
        next()
    })(req, res, next)
} */