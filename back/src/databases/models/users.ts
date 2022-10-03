import { DataTypes, Model } from "sequelize";
import { sequelize } from '../config'

class User extends Model { }
User.init({
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING
    }
}, {
    sequelize,
    modelName: 'User'
})