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
Teams.belongsTo(Matches, { foreignKey: 'home_team_id' });
Matches.hasMany(Teams, { foreignKey: 'home_team_id' });

Teams.belongsTo(Matches, { foreignKey: 'away_team_id' });
Matches.hasMany(Teams, { foreignKey: 'away_team_id' });
// OtherModel.belongsTo(Example, { foreignKey: 'campoA', as: 'campoEstrangeiroA' });
// OtherModel.belongsTo(Example, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });

// Example.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
// Example.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });

export default Matches;
