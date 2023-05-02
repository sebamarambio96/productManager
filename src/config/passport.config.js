import passport from 'passport'
import local from 'passport-local'
import { usersManager } from "../dao/models/usersShema.js"
import { encryptPass, validPass } from "../utils/bcrypt.js"
import { Strategy as GithubStrategy } from 'passport-github2'
/* import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt' */

const LocalStrategy = local.Strategy

passport.use('register', new LocalStrategy({
    passReqToCallback: true,
    usernameField: 'user',
    passwordField: 'pass'
}, async (req, _u, _p, done) => {
    const { user, pass } = req.body
    console.log(user, pass)
    await usersManager.register({ user, pass: encryptPass(pass) })
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
    clientID:"Iv1.06228b278462ca87",
    clientSecret:"8162d55f92f14efdfe0e568aa25a49a15fd7e94b",
    callbackURL: "http://localhost:8080/profile/sessionGitHub",
}, async (accessToken, refreshToken, profile, done) => {
    try {
        console.log(profile)
        let user = await usersManager.getByUser(user)
        if (!user) {
            let newUser ={
                user: profile._json.email,
                pass: ''
            }
            let result = usersManager.register({user: newUser.user, pass:newUser.pass})
            done(null,result)
        } else {
            done(null,user)
        }
    } catch (error) {
        return done(error)
    }

})
)

passport.serializeUser((user, next) => { next(null, user) })
passport.deserializeUser((user, next) => { next(null, user) })

export const passportInit = passport.initialize()
export const passportSession = passport.session()

export const autenticacionPorGithub = passport.authenticate('github', { session: false, scope: ['user:email'] })
export const antenticacionPorGithub_CB = passport.authenticate('github', { session: false, failWithError: true })