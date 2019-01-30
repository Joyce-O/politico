import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import {
  correctSignup, incorrectSignup, emailExist, correctLogin, incorrectLogin,
  emailNotExist, correctParty, incorrectParty, dupPartyEmail
} from './mockInputes';

const { expect } = chai;

chai.use(chaiHttp);

describe('Tests for Homepage and invalid url endpoints', () => {
  describe('Test for Homepage API Endpoint', () => {
    it('Should return status code 200 for success', done => {
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
    it('Should return status code 404 for failure', done => {
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
    it('should return 201 for success', done => {
      chai.request(app)
        .post('/api/v1/signup')
        .send(correctSignup)
        .end((error, response) => {
          expect(response).to.have.status(201);
          done();
        });
    });
    it('should return 400 for invalid inputs', done => {
      chai.request(app)
        .post('/api/v1/signup')
        .send(incorrectSignup)
        .end((error, response) => {
          expect(response).to.have.status(400);
          done();
        });
    });
    it('should return 409 for already existing email', done => {
      chai.request(app)
        .post('/api/v1/signup')
        .send(emailExist)
        .end((error, response) => {
          expect(response).to.have.status(409);
          expect(response.body.error).to.equal('Email already exist, please use another email or login.');
          done();
        });
    });
  });
  describe('Test for Login', () => {
    it('should return 200 for success', done => {
      chai.request(app)
        .post('/api/v1/login')
        .send(correctLogin)
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response.body.data).to.equal(`Welcome back ${correctSignup.firstname}!`);
          done();
        });
    });
    it('should return 400 for invalid inputs', done => {
      chai.request(app)
        .post('/api/v1/login')
        .send(incorrectLogin)
        .end((error, response) => {
          expect(response).to.have.status(400);
          done();
        });
    });
    it('should return 404 if the email does not exist', done => {
      chai.request(app)
        .post('/api/v1/login')
        .send(emailNotExist)
        .end((error, response) => {
          expect(response).to.have.status(404);
          expect(response.body.error).to.equal('email or password does not exist');
          done();
        });
    });
  });
});
describe('Tests for create party endpoint', () => {
  it('should return 201 for success', done => {
    chai.request(app)
      .post('/api/v1/parties')
      .send(correctParty)
      .end((error, response) => {
        expect(response).to.have.status(201);
        done();
      });
  });
  it('should return 400 for invalid inputs', done => {
    chai.request(app)
      .post('/api/v1/parties')
      .send(incorrectParty)
      .end((error, response) => {
        expect(response).to.have.status(400);
        done();
      });
  });
  it('should return 409 for already existing data', done => {
    chai.request(app)
      .post('/api/v1/parties')
      .send(dupPartyEmail)
      .end((error, response) => {
        expect(response).to.have.status(409);
        done();
      });
  });
});

describe('Test for get all parties endpoint', () => {
  it('Should return status code 200 for success', done => {
    chai.request(app)
      .get('/api/v1/parties')
      .end((error, response) => {
        expect(response).to.have.status(200);
        done();
      });
  });
});

describe('Test for get specific party endpoint', () => {
  it('Should return status code 200 for success', done => {
    chai.request(app)
      .get('/api/v1/parties/1')
      .end((error, response) => {
        expect(response).to.have.status(200);
        done();
      });
  });

  it('should return 404 for party not exist', done => {
    chai.request(app)
      .get('/api/v1/parties/100000')
      .end((error, response) => {
        expect(response).to.have.status(404);
        done();
      });
  });
});
describe('Test for edit party endpoint', () => {
  it('Should return status code 200 for success', done => {
    chai.request(app)
      .patch('/api/v1/parties/2/name')
      .send({ name: 'Peoples Living Party' })
      .end((error, response) => {
        expect(response).to.have.status(200);
        done();
      });
  });
  it('should return 404 for party not exist', done => {
    chai.request(app)
      .patch('/api/v1/parties/10000/name')
      .send({ name: 'APeople Progress Partys' })
      .end((error, response) => {
        expect(response).to.have.status(404);
        expect(response.body.error).to.equal('Party does not exist');
        done();
      });
  });
  it('should return 409 for party name exist', done => {
    chai.request(app)
      .patch('/api/v1/parties/1/name')
      .send({ name: 'Peoples Living Party' })
      .end((error, response) => {
        expect(response).to.have.status(409);
        expect(response.body.error).to.equal('Name already exist');
        done();
      });
  });
});
describe('Test for delete specific party endpoint', () => {
  it('Should return status code 200 for success', done => {
    chai.request(app)
      .delete('/api/v1/parties/1')
      .end((error, response) => {
        expect(response).to.have.status(200);
        done();
      });
  });
  it('should return 404 for party not exist', done => {
    chai.request(app)
      .delete('/api/v1/parties/1000')
      .end((error, response) => {
        expect(response).to.have.status(404);
        expect(response.body.error).to.equal('party does not exist');
        done();
      });
  });
});

describe('Tests for create office endpoint', () => {
  it('should return 201 for success', done => {
    chai.request(app)
      .post('/api/v1/offices')
      .send({ name: 'House Memberv', type: 'Legislativee' })
      .end((error, response) => {
        expect(response).to.have.status(201);
        done();
      });
  });
  it('should return 400 for invalid inputs', done => {
    chai.request(app)
      .post('/api/v1/offices')
      .send({ name: 'incorrectParty' })
      .end((error, response) => {
        expect(response).to.have.status(400);
        done();
      });
  });
  it('should return 409 for already existing data', done => {
    chai.request(app)
      .post('/api/v1/offices')
      .send({ name: 'Senate', type: 'legislative' })
      .end((error, response) => {
        expect(response).to.have.status(409);
        done();
      });
  });
});

describe('Test for get all offices endpoint', () => {
  it('Should return status code 20 for success', done => {
    chai.request(app)
      .get('/api/v1/offices')
      .end((error, response) => {
        expect(response).to.have.status(200);
        done();
      });
  });
});

describe('Test for get specific office endpoint', () => {
  it('Should return status code 200 for success', done => {
    chai.request(app)
      .get('/api/v1/offices/1')
      .end((error, response) => {
        expect(response).to.have.status(200);
        done();
      });
  });
  it('should return 400 for invalid inputs', done => {
    chai.request(app)
      .get('/api/v1/offices/a')
      .end((error, response) => {
        expect(response).to.have.status(400);
        done();
      });
  });
  it('should return 404 for office not exist', done => {
    chai.request(app)
      .get('/api/v1/offices/100000')
      .end((error, response) => {
        expect(response).to.have.status(404);
        expect(response.body.error).to.equal('office does not exist');
        done();
      });
  });
});
