// // models/car.js
// module.exports = (sequelize, DataTypes) => {
//     const CarDetail = sequelize.define("Car", {
//         make: DataTypes.STRING,
//         model: DataTypes.STRING,
//         year: DataTypes.INTEGER,
//     });

//     CarDetail.associate = (models) => {
//         CarDetail.belongsTo(models.User, {
//             foreignKey: "userId",
//             onDelete: "CASCADE",
//         });
//     };

//     return CarDetail;
// };
