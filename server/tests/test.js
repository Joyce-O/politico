import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import {
  correctSignup, incorrectSignup, correctLogin, incorrectLogin,
  emailNotExist, correctParty, incorrectParty, dupPartyEmail,
} from './mockInputes';

const { expect } = chai;
let userToken;
let adminToken;

chai.use(chaiHttp);

describe('Tests for Homepage and invalid url endpoints', () => {
  describe('Test for Homepage API Endpoint', () => {
    it('Should return status code 200 for success', (done) => {
      chai.request(app)
        .get('/api/v1')
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response.body.data).to.equal('Welcome to Politico, vote on the go!');
          done();
        });
    });
  });

  describe('Test for Invalid URL', () => {
    it('Should return status code 404 for failure', (done) => {
      chai.request(app)
        .get('/notexist')
        .end((error, response) => {
          expect(response).to.have.status(404);
          expect(response.body.error).to.equal('Oops! This page does not exist.');
          done();
        });
    });
  });
});
describe('Tests for user endpoints', () => {
  describe('Test for Signup', () => {
    it('should return 201 for success', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(correctSignup)
        .end((error, response) => {
          expect(response).to.have.status(201);
          done();
        });
    });
    it('should return 400 for invalid inputs', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(incorrectSignup)
        .end((error, response) => {
          expect(response).to.have.status(400);
          done();
        });
    });
  });
  describe('Generate Token for testing Endpoints', () => {
    it('should return token for user successful login', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(correctLogin)
        .end((error, response) => {
          expect(response).to.have.status(200);
          userToken = response.body.token;
          done();
        });
    });
    it('should return token for admin successful login', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'chief@gmail.com',
          password: 'admin',
        })
        .end((error, response) => {
          expect(response).to.have.status(200);
          adminToken = response.body.token;
          done();
        });
    });
  });
  describe('Test for Login', () => {
    it('should return 400 for invalid inputs', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(incorrectLogin)
        .end((error, response) => {
          expect(response).to.have.status(400);
          done();
        });
    });
    it('should return 400 if the email does not exist', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(emailNotExist)
        .end((error, response) => {
          expect(response).to.have.status(400);
          done();
        });
    });
  });
});
describe('Tests for create party endpoint', () => {
  it('should return 201 for success', (done) => {
    chai.request(app)
      .post('/api/v1/parties')
      .set('authorization', adminToken)
      .send(correctParty)
      .end((error, response) => {
        expect(response).to.have.status(201);
        done();
      });
  });
  it('should return 400 for invalid inputs', (done) => {
    chai.request(app)
      .post('/api/v1/parties')
      .set('authorization', adminToken)
      .send(incorrectParty)
      .end((error, response) => {
        expect(response).to.have.status(400);
        done();
      });
  });
});

describe('Test for get all parties endpoint', () => {
  it('Should return status code 200 for success', (done) => {
    chai.request(app)
      .get('/api/v1/parties')
      .set('authorization', adminToken)
      .end((error, response) => {
        expect(response).to.have.status(200);
        done();
      });
  });
});

describe('Test for get specific party endpoint', () => {
  it('Should return status code 200 for success', (done) => {
    chai.request(app)
      .get('/api/v1/parties/1')
      .set('authorization', adminToken)
      .end((error, response) => {
        expect(response).to.have.status(200);
        done();
      });
  });

  it('should return 404 for party not exist', (done) => {
    chai.request(app)
      .get('/api/v1/parties/100000')
      .set('authorization', adminToken)
      .end((error, response) => {
        expect(response).to.have.status(404);
        done();
      });
  });
});
describe('Test for delete specific party endpoint', () => {
  it('Should return status code 200 for success', (done) => {
    chai.request(app)
      .delete('/api/v1/parties/1')
      .set('authorization', adminToken)
      .end((error, response) => {
        expect(response).to.have.status(200);
        done();
      });
  });
  it('should return 404 for party not exist', (done) => {
    chai.request(app)
      .delete('/api/v1/parties/1000')
      .set('authorization', adminToken)
      .end((error, response) => {
        expect(response).to.have.status(404);
        expect(response.body.error).to.equal('Party does not exist');
        done();
      });
  });
});

describe('Tests for create office endpoint', () => {
  it('should return 201 for success', (done) => {
    chai.request(app)
      .post('/api/v1/offices')
      .set('authorization', adminToken)
      .send({
        name: 'House Memberv', type: 'state', ageLimit: '35 - 75', basicQual: 'undergraduate level',
      })
      .end((error, response) => {
        expect(response).to.have.status(201);
        done();
      });
  });
  it('should return 400 for invalid inputs', (done) => {
    chai.request(app)
      .post('/api/v1/offices')
      .set('authorization', adminToken)
      .send({ name: 'incorrectParty' })
      .end((error, response) => {
        expect(response).to.have.status(400);
        done();
      });
  });
  it('should return 409 for already existing data', (done) => {
    chai.request(app)
      .post('/api/v1/offices')
      .set('authorization', adminToken)
      .send({
        name: 'House Memberv', type: 'state', ageLimit: '35 - 75', basicQual: 'undergraduate level',
      })
      .end((error, response) => {
        expect(response).to.have.status(409);
        done();
      });
  });
});

describe('Test for get specific office endpoint', () => {
  it('should return 404 for office not exist', (done) => {
    chai.request(app)
      .get('/api/v1/offices/100000')
      .set('authorization', adminToken)
      .end((error, response) => {
        expect(response).to.have.status(404);
        expect(response.body.error).to.equal('office does not exist');
        done();
      });
  });
});
