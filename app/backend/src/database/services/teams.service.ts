import Teams from '../models/TeamsModel';

export async function getAllTeams() {
  const data = await Teams.findAll();
  return { status: 200, data };
}

export async function getOneTeam(id: string) {
  const data = await Teams.findOne({ where: { id } });
  return { status: 200, data };
}
