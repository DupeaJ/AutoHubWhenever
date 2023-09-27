const Sequelize = require("sequelize");
const sequelize = require("../config/database");
const UserModel = require("./Users");
const CarDetailModel = require("./carDetail"); //

const User = UserModel(sequelize, Sequelize);
const CarDetail = CarDetailModel(sequelize, Sequelize);

sequelize
    .sync({ force: false })
    .then(() => {
        console.log(`Database & tables created!`);
    });

module.exports = {
    User,
    CarDetail,
};
