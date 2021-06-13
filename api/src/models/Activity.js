const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Activity',{
        name:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        difficulty:{
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 1,
        },
        duration: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 30
        },
        season: {
            type: DataTypes.STRING,
            allowNull: true,
            isIn: {
                args: [['winter', 'summer', 'spring', 'autumn', 'all']],
                msg: "Must be a valid season of the year",
            }
        }
    });
}