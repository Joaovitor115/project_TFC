// import chai from 'chai';
// import sinon from 'sinon';
// import { expect } from 'chai';
// import jwt from 'jsonwebtoken';
// import { validateToken } from '../database/Middlewares/loginMiddleware';
// import { secret, config } from '../database/Authorization/jwtconfig';
// import { mockPayload } from './mocks';
// import UsersController from '../database/controllers/users.controller';

// describe('JWT token tests', () => {
//   let sandbox: sinon.SinonSandbox;
  
//   beforeEach(() => {
//     sandbox = sinon.createSandbox();
//   });

//   afterEach(() => {
//     sandbox.restore();
//   });

//   it('should generate a valid JWT token', () => {
//    const usersController = new UsersController;
//    const payload = mockPayload;
//    const token = jwt.sign(payload, secret, config);
//     sinon
//     .stub(usersController, "login")
//     .resolves(
//       token as UsersController);
//     expect(token).to.be.a('string');
//     const decoded = jwt.verify(token, secret);
//     expect(decoded).to.deep.equal(payload);
//   });

//   it('should verify a valid JWT token', () => {
//     const payload = mockPayload ;
//     const token = jwt.sign(payload, secret);
//     const result = jwt.verify(token, secret);
//     expect(result).to.deep.equal(payload);
//   });

//   it('should throw error on invalid token', () => {
//     const invalidToken = 'invalid-token';
//     expect(() => jwt.verify(invalidToken, secret)).to.throw('jwt malformed');
//   });
// });
