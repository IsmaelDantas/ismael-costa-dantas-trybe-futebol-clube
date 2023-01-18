// importando os módulos necessários
import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jsonwebtoken from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

// importando os mocks
import { MatchesMocks, MatchesMocksUp } from './mocks/MatchesMocks';
import  'express-async-errors';

// importando os arquivos necessários
import App from '../app';
import MatchesModel from '../database/models/MatchesModel';
import * as bcrypt from 'bcryptjs';

import { Response } from 'superagent';
import signToken from '../utils/signToken';

// configuração do chai-http
chai.use(chaiHttp);
const { app } = new App();
const { expect } = chai;

describe('tests matches', () => {
  let chaiHttpResponse: Response;

    // Testa a rota de get de matches sem parâmetros
    it('Verifies a get in the route to matches', async () => {
        // stub do método findAll
        sinon.stub(MatchesModel, "findAll").resolves(MatchesMocks as any);
        chaiHttpResponse = await chai.request(app).get('/matches').send(MatchesMocks);
        expect(chaiHttpResponse.status).to.be.equal(200);
        expect(chaiHttpResponse.body).to.deep.equal(MatchesMocks);
    });

    // Testa a rota de get de matches com parâmetro inProgress=false
    it('Verifies a Get in the rout to matches with InProgress false', async () => {
        sinon.stub(MatchesModel, "findAll").resolves(MatchesMocks[0] as any);
        chaiHttpResponse = await chai.request(app).get('/matches?inProgress=false').send(MatchesMocks[0]);
        expect(chaiHttpResponse.status).to.be.equal(200);
        expect(chaiHttpResponse.body).to.deep.equal(MatchesMocks[0]);
    });

    // Testa a rota de get de matches com parâmetro inProgress=true
    it('Verifies if a get in the route to matches with InProgress true', async () => {
        sinon.stub(MatchesModel, "findAll").resolves(MatchesMocks[1] as any);
        chaiHttpResponse = await chai.request(app).get('/matches?inProgress=true').send(MatchesMocks[1]);
        expect(chaiHttpResponse.status).to.be.equal(200);
        expect(chaiHttpResponse.body).to.deep.equal(MatchesMocks[1]);
    });

    // Testa a rota de post de matches para criação
    it('Verifies a post in the route to matches', async () => {
        // stub do método verify do jsonwebtoken
        sinon.stub(jsonwebtoken, "verify").resolves({ id: 1 });
        // stub do método create do MatchesModel
        sinon.stub(MatchesModel, "create").resolves(MatchesMocksUp[0] as any);

        chaiHttpResponse = await chai.request(app).post('/matches').send(MatchesMocksUp[0]).set('Authorization', 'jwt_secret');
        expect(chaiHttpResponse.status).to.be.equal(201);
        expect(chaiHttpResponse.body).to.deep.equal(MatchesMocksUp[1]);
    });

    // Limpa os stubs após cada teste
    afterEach(sinon.restore);
})