const User = require("./User");
const Car = require("./Car");

User.hasMany(Car, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
});

Car.belongsTo(User, {
    foreignKey: "user_id",
});

module.exports = { User, Car };
