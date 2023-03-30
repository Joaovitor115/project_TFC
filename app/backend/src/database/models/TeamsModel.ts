import { DataTypes, Model } from 'sequelize';
import db from '.';
// import OtherModel from './OtherModel';

class Teams extends Model {
  declare id: number;
  declare teamName: string;
}

Teams.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    teamName: DataTypes.STRING(128),
  },
  {
    underscored: true,
    sequelize: db,
    modelName: 'Teams',
    timestamps: false,
  },
);

/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

// OtherModel.belongsTo(Teams, { foreignKey: 'campoA', as: 'campoEstrangeiroA' });
// OtherModel.belongsTo(Teams, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });

// Teams.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
// Teams.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });

export default Teams;
