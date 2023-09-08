const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
function initialize(passport, getUserByEmail, getUserById) {
    const authenticateUser = async (email, password, done) => {
        try {
            const user = await getUserByEmail(email)
            if (user == null) {
            return done(null, false, { message: "no user with that email" })
        }
        console.log("Password from form:", password);
        console.log("Password from user object:", user.password);
            if (await bcrypt.compare(password, user.password)) {
                console.log(user);
                return done(null, user)
            } else {
                return done(null, false, { message: 'Incorrect Password' })
            }
        } catch (e) {
            return done(e)
        }
    }
    passport.use(new LocalStrategy({ usernameField: 'email' },
        authenticateUser))
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => {
        return done(null, getUserById(id))
    })
}

module.exports = initialize