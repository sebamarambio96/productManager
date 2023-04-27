import { usersManager } from "../dao/models/usersShema.js"

//SET cookie
export async function setCookie(req, res, next) {
    try {
        res.cookie('CoderCookie', 'data', { maxAge: 1000000000 }).send({ status: "success", message: "cookie set" })
    } catch (error) {
        next(error)
    }
}

//GET cookies
export async function getCookies(req, res, next) {
    try {
        res.send(req.cookies)
    } catch (error) {
        next(error)
    }
}
//DELETE cookie
export async function deleteCookie(req, res, next) {
    try { 
        res.clearCookie("CoderCookie").send("Cookie Removed")
    } catch (error) { 
        next(error)
    }
}
//LOGOUT
export async function logout(req, res, next) {
    try {
        req.session.destroy(err => {
            if (err) {
                res.json({ status: 'Logout ERROR', body: err })
            } else {
                res.status(201).json({message: 'Logout OK'})
            }})
    } catch (error) {
        next(error)
    }
}
//Session test
export async function session(req, res, next) {
    try {
        if (req.session.counter) {
            req.session.counter++
            res.send(`Contador de visitas ${req.session.counter}`)
        } else {
            req.session.counter = 1
            res.status(201).json({message: 'Bienvenido'})
        }
    } catch (error) {
        next(error)
    }
}

//login
export async function login(req, res, next) {
    try {
        const {username, pass} = req.body
        console.log(username, pass);
        const usersData = await usersManager.getAll()
        const exist = usersData.filter(x=> x.user == username)
        /* if (exist.length == 0) throw new Error('Login Fail') */
        if (username == 'adminCoder@coder.com' && pass == 'adminCod3r123') {
            req.session.admin = true
            req.session.user = 'adminCoder@coder.com'
            res.status(200).json(req.session)
        }else if (exist[0].pass == pass) {
            req.session.admin = false
            req.session.user = exist[0].user
            res.status(200).json(req.session)
        } else {
            throw new Error('Login Fail')
        }
    } catch (error) {
        next(error)
    }
}

//Login
export async function register(req, res, next) {
    try {
        const {user, pass}= req.body
        console.log(user, pass);
        await usersManager.register({user, pass})
        res.status(201).json({ message: 'Usuario registrado' })
    } catch (error) {
        next(error)
    }
}