if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const passport = require('passport')
const mysql = require('mysql')
const flash = require('express-flash')
const session = require("express-session");
const methodOverride = require('method-override')


const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MYSQL connected');
})

initializePassport = require('./config/passport-config')
initializePassport(
    passport,
    async email => {
        const result = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM users WHERE email = ?', [email], (error, results) => {
                if (error) return reject(error);
                resolve(results[0]);
            });
        });
        return result;
    },
    async id => {
        const result = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM users WHERE id = ?', [id], (error, results) => {
                if (error) return reject(error);
                resolve(results[0]);
            });
        });
        return result;
    }
);

app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized:false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

app.get('/', checkAuthenticated, (req, res) => {
    res.render("index.ejs", {name: req.user.name})
})

app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login.ejs')
})
app.post("/login", checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
})) 

app.get("/register", checkNotAuthenticated, (req, res) => {
    res.render("register.ejs");
})

app.post('/register', checkNotAuthenticated, async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 15)
        const newUser = {
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        };

        db.query('INSERT INTO users SET ?', newUser, (err, result) => {
            if (err) throw err;
            res.redirect('/login')
        });
    } catch {
        res.redirect('/register')
    }
})

app.delete('/logout', (req, res) => {
    req.logOut()
    res.redirect('/login')
})

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    next()
}

app.listen(3001, () => {
    console.log('Server is live at port 3001');
});