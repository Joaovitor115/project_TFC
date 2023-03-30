import { DataTypes, Model } from 'sequelize';
import db from '.';
// import OtherModel from './OtherModel';

class Users extends Model {
  declare id: number;
  declare username: string;
  declare email: string;
  declare password: string;
  declare role: string;
}

Users.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: DataTypes.STRING(128),
    role: DataTypes.STRING(128),
    email: DataTypes.STRING(128),
    password: DataTypes.STRING(128),
  },
  {
    underscored: true,
    sequelize: db,
    modelName: 'Users',
    timestamps: false,
  },
);

/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

// OtherModel.belongsTo(Users, { foreignKey: 'campoA', as: 'campoEstrangeiroA' });
// OtherModel.belongsTo(Users, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });

// Users.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
// Users.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });

export default Users;
