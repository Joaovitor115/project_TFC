import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import * as jwt from 'jsonwebtoken'
import { Response } from 'superagent';
import { allMatches, allMatchesFalse, allMatchesTrue, allTeams, insertedMatch, oneTeam, userAdmin } from './mocks';
import TeamsService from '../database/services/teams.service';
import Teams from '../database/models/TeamsModel';
import Users from '../database/models/UsersModel';
import Matches from '../database/models/MatchesModel';
const axios = require('axios');



const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwicGFzc3dvcmQiOiJzZWNyZXRfYWRtaW4ifSwiaWF0IjoxNjgwNzI1NzUzfQ.EHfgzzRNXuAiUanJW6Nh9w5Bp_F5_vNJJ-4FnRkA-9Q';
// const tokenStub = sinon.stub().returns(token);
// const config = {
//   headers: {
//     Authorization: `Bearer ${token}`
//   }
// };

chai.use(chaiHttp);
const { expect } = chai;

describe('teste de integração', () => {
beforeEach( () => sinon.restore())

  describe('', () => {
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

it('validate that it returns a token', async () => {
  sinon
      .stub(Users, "findOne")
      .resolves(userAdmin as Users);
  const response = await chai.request(app).post('/login').
  send({  email: 'admin@admin.com', password: 'secret_admin'})
  expect(response.status).to.be.equal(200)
  expect(response.body).to.property('token')
});

it('validate that it returns the role of the current user', async () => {
  const payload = {email: 'admin@admin.com'}
  sinon.stub(jwt, 'verify').callsFake(() => payload)
  sinon.stub(Users, "findOne").resolves(userAdmin as Users);
  const response = await chai.request(app).get('/login/role').set('Authorization', 'meu_token')
  expect(response.status).to.be.equal(200)
  expect(response.body).to.deep.equal({ role: "admin" })
});

it('validate that it return all matches', async () => {
  sinon.stub(Matches, "findAll").resolves(allMatches as unknown as Matches[]);
  const response = await chai.request(app).get('/matches')
  expect(response.status).to.be.equal(200)
  expect(response.body).to.deep.equal(allMatches)
});

it('validate that it return all matches not finished', async () => {
  sinon.stub(Matches, "findAll").resolves(allMatchesTrue as unknown as Matches[]);
  const response = await chai.request(app).get('/matches?inProgress=true')
  expect(response.status).to.be.equal(200)
  expect(response.body).to.deep.equal(allMatchesTrue)
});

it('validate that it return all matches that are not currently in progress', async () => {
  sinon.stub(Matches, "findAll").resolves(allMatchesFalse as unknown as Matches[]);
  const response = await chai.request(app).get('/matches?inProgress=false')
  expect(response.status).to.be.equal(200)
  expect(response.body).to.deep.equal(allMatchesFalse)
});

it.only('validate that it can finish a match', async () => {
  sinon.stub(Matches, 'update').resolves()
  sinon.stub(Matches, 'findByPk').resolves(insertedMatch as unknown as Matches)

  
  const response = await chai.request(app).patch('/matches/41/finish').send().set('Authorization', token)
  console.log(response.body, 'BODYYYYY' );
  
  expect(response.status).to.be.equal(200)
  expect(response.body).to.deep.equal({ message: "Finished" })  
});

it('validate that it can update a match', async () => {
  sinon.stub(Matches, "update").resolves()
  const response = await chai.request(app).patch('/matches/41').send({
    "homeTeamGoals": 3,
    "awayTeamGoals": 1
  })
  expect(response.status).to.be.equal(200)
  expect(response.body).to.deep.equal({message: "Goals updated with success"})
});

it('validate that it can create a match', async () => {
  sinon.stub(Matches, "create").resolves(insertedMatch as unknown as Matches);
  const response = await chai.request(app).patch('/matches').send({
    "homeTeamId": 16,
    "awayTeamId": 8, 
    "homeTeamGoals": 2,
    "awayTeamGoals": 2
  })
  expect(response.status).to.be.equal(201)
  expect(response.body).to.deep.equal(insertedMatch)
});


 
  });
});
