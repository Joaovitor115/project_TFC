import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import { allTeams, oneTeam } from './mocks';
import TeamsService from '../database/services/teams.service';
import Teams from '../database/models/TeamsModel';
import Users from '../database/models/UsersModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('teste de integração', () => {
beforeEach( () => sinon.restore())

  describe('getAllTeams and getOneTeam', () => {
    it('should return all teams', async () => {

          sinon
            .stub(Teams, "findAll")
            .resolves(
              allTeams as Teams[]);

      const httpResponse = await chai.request(app).get('/teams')
      expect(httpResponse.status).to.be.equal(200)
      expect(httpResponse.body).to.deep.equal(allTeams)
    });

    it('should return one team', async () => {

         sinon
           .stub(Teams, "findOne")
            .resolves(
              oneTeam as Teams);

      const httpResponse = await chai.request(app).get('/teams/5')
      expect(httpResponse.status).to.be.equal(200)
      expect(httpResponse.body).to.deep.equal(oneTeam)
    });

    it('testing /login failing with no password', async () => {

   const response = await chai.request(app).post('/login').send({ email: 'zezin@zezin.com' })
   expect(response.status).to.be.equal(400)
   expect(response.body).to.deep.equal({ message: 'All fields must be filled'})
 });

 it('testing /login failing with invalid email or password', async () => {

  const response = await chai.request(app).post('/login').
  send({ email: 'zezinzezin.com', password: 'sfasf'})
  expect(response.status).to.be.equal(401)
  expect(response.body).to.deep.equal({ message: 'Invalid email or password'})
});
it('t', async () => {
  sinon
      .stub(Users, "findOne")
      .resolves({ 
          username: 'Admin',
          email: 'admin@admin.com',
          role: 'admin',
          password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
          id: 1,
      } as Users);
  const response = await chai.request(app).post('/login').
  send({  email: 'admin@admin.com', password: 'secret_admin'})
  expect(response.status).to.be.equal(200)
  expect(response.body).to.property('token')
});

 
  });
});
