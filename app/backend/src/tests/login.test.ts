// importando os módulos necessários
import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jsonwebtoken from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

// importando os mocks
import { loginMock, token, userMock } from './mocks/loginMocks';
import 'express-async-errors';

// importando os arquivos necessários
import App from '../app';
import AuthModel from '../database/models/AuthModel';

import { Response } from 'superagent';

// configuração do chai-http
chai.use(chaiHttp);
const { app } = new App();
const { expect } = chai;

// início dos testes
describe('tests login route /login', () => {

  // variável para guardar a resposta do chai-http
  let chaiHttpResponse: Response;
  // limpeza dos mocks após cada teste
  afterEach(function() {
    sinon.restore();
  });

  // início dos testes da rota de login
  describe('Login Auth', () => {    
    // teste de login com sucesso
    it('Ok lOGIN', async () => {
      // mock do método findOne
      sinon.stub(AuthModel, 'findOne').resolves(userMock as unknown as AuthModel);
      // mock do método sign
      sinon.stub(jsonwebtoken, 'sign').resolves(token);

      chaiHttpResponse = await chai.request(app).post('/login').send(loginMock)
      // verifica se o status retornado é 200
      expect(chaiHttpResponse.status).to.be.equal(200);
      // verifica se o body retornado é igual ao esperado
      expect(chaiHttpResponse.body).to.be.deep.equal({ token });
    });   

    // teste para não informar o campo email
    it('Do not inform email', async () => {

      chaiHttpResponse = await chai.request(app).post('/login').send(
        {
          password: 'secret_admin'
        }
      );

      // verifica se o status retornado é 400
      expect(chaiHttpResponse.status).to.be.equal(400);
      // verifica se o body retornado é igual ao esperado
      expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'All fields must be filled' });
    });

    // teste para não informar o campo password
    it('Do not inform password', async () => {

      chaiHttpResponse = await chai.request(app).post('/login').send(
        {
          email: 'admin@admin.com'
        }
      );

      // verifica se o status retornado é 400
      expect(chaiHttpResponse.status).to.be.equal(400);
      // verifica se o body retornado é igual ao esperado
      expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'All fields must be filled' });
    });

    // teste para informar email inválido
    it('Inform a invalid camp', async () => {

      chaiHttpResponse = await chai.request(app).post('/login').send(
        {
          email: 'admins@admins.com',
          password: 'secret_admin'
        }
      );

      // verifica se o status retornado é 401
      expect(chaiHttpResponse.status).to.be.equal(401);
      // verifica se o body retornado é igual ao esperado
      expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Incorrect email or password' });
    });

    // teste para informar password inválido
    it('Inform invalid password camp', async () => {

      chaiHttpResponse = await chai.request(app).post('/login').send(
        {
          email: 'admin@admin.com',
          password: 'secret_admins'
        }
      );

      // verifica se o status retornado é 401
      expect(chaiHttpResponse.status).to.be.equal(401);
      // verifica se o body retornado é igual ao esperado
      expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Incorrect email or password' });
    });
  });
});
