import { DataTypes, Model } from 'sequelize';
import db from '.';
import Teams from './TeamsModel';
// import OtherModel from './OtherModel';

class Matches extends Model {
  declare id: number;
  declare homeTeamId: string;
  declare homeTeamGoals: string;
  declare awayTeamId: string;
  declare awayTeamGoals: string;
  declare inProgress: boolean;
  declare homeTeam: object;
  declare awayTeam: object;
}

Matches.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    awayTeamId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Teams,
        key: 'id',
      },
    },
    awayTeamGoals: {
      type: DataTypes.INTEGER,
      allowNull: false,

    },
    homeTeamId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Teams,
        key: 'id',
      },
    },
    homeTeamGoals: {
      type: DataTypes.INTEGER,
      allowNull: false,

    },
    inProgress: {
      type: DataTypes.BOOLEAN,
      allowNull: false,

    },
  },
  {
    underscored: true,
    sequelize: db,
    modelName: 'Matches',
    timestamps: false,
  },
);

/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */
Matches.belongsTo(Teams, { foreignKey: 'homeTeamId', as: 'homeTeam' });
Teams.hasMany(Matches, { foreignKey: 'homeTeamId', as: 'homeTeam' });

Matches.belongsTo(Teams, { foreignKey: 'awayTeamId', as: 'awayTeam' });
Teams.hasMany(Matches, { foreignKey: 'awayTeamId', as: 'awayTeam' });
// OtherModel.belongsTo(Example, { foreignKey: 'campoA', as: 'campoEstrangeiroA' });
// OtherModel.belongsTo(Example, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });

// Example.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
// Example.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });

export default Matches;
