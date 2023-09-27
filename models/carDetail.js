const db = require("../config/database");

module.exports = (sequelize, DataTypes) => {
    const CarDetail = sequelize.define(
        "CarDetail",
        {
            carid: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            userId: {
                type: DataTypes.INTEGER,
                references: {
                    model: "Users",
                    key: "id",
                },
            },
            make: DataTypes.STRING,
            model: DataTypes.STRING,
            productionYear: DataTypes.INTEGER,
        },
        {
            tableName: "cardetails",
        }
    );

    CarDetail.associate = (models) => {
        CarDetail.belongsTo(models.Users, {
            foreignKey: "userId",
            as: "user",
        });
    };

    return CarDetail;
};
