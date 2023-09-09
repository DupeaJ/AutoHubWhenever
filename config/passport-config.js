const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const db = require("./database");

function initialize(passport) {
    const authenticateUser = async (email, password, done) => {
        try {
            const user = await getUserByEmail(email);
            if (user == null) {
                return done(null, false, {
                    message: "no user with that email",
                });
            }
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user);
            } else {
                return done(null, false, { message: "Incorect Password" });
            }
        } catch (e) {
            return done(e);
        }
    };

    const getUserByEmail = async (email) => {
        const result = await new Promise((resolve, reject) => {
            db.query(
                "SELECT * FROM users WHERE email = ?",
                [email],
                (error, results) => {
                    if (error) return reject(error);
                    resolve(results[0]);
                }
            );
        });
        return result;
    };
    const getUserById = async (id) => {
        const result = await new Promise((resolve, reject) => {
            db.query(
                "SELECT * FROM users WHERE id = ?",
                [id],
                (error, results) => {
                    if (error) return reject(error);
                    resolve(results[0]);
                }
            );
        });
        return result;
    };

    passport.use(
        new LocalStrategy({ usernameField: "email" }, authenticateUser)
    );
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await getUserById(id);
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    });
}

module.exports = initialize;
