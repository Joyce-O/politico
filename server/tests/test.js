import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import {
  correctSignup, incorrectSignup, emailExist, correctLogin, incorrectLogin, emailNotExist
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
          expect(response.body.message).to.equal('Welcome to Politico, vote on the go!');
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
          expect(response.body.message).to.equal('Oops! This page does not exist.');
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
          expect(response.body.message).to.equal(`Welcome ${correctSignup.firstname}`);
          done();
        });
    });
    it('should return 400 for invalid inputs', done => {
      chai.request(app)
        .post('/api/v1/signup')
        .send(incorrectSignup)
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body.success).to.equal(false);
          done();
        });
    });
    it('should return 409 for already existing email', done => {
      chai.request(app)
        .post('/api/v1/signup')
        .send(emailExist)
        .end((error, response) => {
          expect(response).to.have.status(409);
          expect(response.body.message).to.equal('Email already exist, please use another email or login.');
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
          expect(response.body.message).to.equal(`Welcome back ${correctSignup.firstname}!`);
          done();
        });
    });
    it('should return 400 for invalid inputs', done => {
      chai.request(app)
        .post('/api/v1/login')
        .send(incorrectLogin)
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body.success).to.equal(false);
          done();
        });
    });
    it('should return 404 if the email does not exist', done => {
      chai.request(app)
        .post('/api/v1/login')
        .send(emailNotExist)
        .end((error, response) => {
          expect(response).to.have.status(404);
          expect(response.body.message).to.equal('email or password does not exist');
          done();
        });
    });
  });
});