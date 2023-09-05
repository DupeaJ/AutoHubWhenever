
const express = require('express');
const session = require('express-session');
const routes = require("./controllers");
const exphbs = require('express-handlebars');

const path = require("path");
const sequelize = require('./config/connection')
const SequelizeStore = require('connect-session-sequelize')(session.Store);
// Loads environment variables from .env file

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });

const sess = {
    secret: "Super secret secret",
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(session(sess));



app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log("Now listening"));
});

// const express = require("express");

// const session = require("express-session");
// const exphbs = require("express-handlebars");

// const authRoute = require("./controllers/api/authController");
// const sequelize = require("./config/connection");
// const helpers = require("./helpers/fsUtils");
// const { authController } = require("./controllers");



// // Create a MySQL connection pool using environment variables
// const db = mysql.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
// });




// const hbs = exphbs.create({ helpers });

// app.engine("handlebars", hbs.engine);
// app.set("view engine", "handlebars");





// app.get("/login", authController.renderLoginForm);
// app.post("/login", authController.processLogin);

// app.use(authRoute);


