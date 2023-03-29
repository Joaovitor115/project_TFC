import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import { allTeams, oneTeam } from './mocks';
import TeamsService from '../database/services/teams.service';
import Teams from '../database/models/TeamsModel';

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
  });
});
