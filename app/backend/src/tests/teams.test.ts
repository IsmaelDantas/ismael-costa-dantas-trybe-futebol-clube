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
import TeamsModel from '../database/models/TeamsModel';
import * as bcrypt from 'bcryptjs';

import { Response } from 'superagent';
import signToken from '../utils/signToken';
import { teamsMocks } from './mocks/TeamsMocks';

// configuração do chai-http
chai.use(chaiHttp);
const { app } = new App();
const { expect } = chai;

describe('Tests teams', () => {
  let chaiHttpResponse: Response;
  // Limpa os stubs após cada teste
  afterEach(sinon.restore);

    // Testa a rota de get de times
    it('Verifies a get in the route to teams', async () => {
        // stub do método findAll
        sinon.stub(TeamsModel, "findAll").resolves(teamsMocks as any[]);
        chaiHttpResponse = await chai.request(app).get('/teams').send();
        expect(chaiHttpResponse.status).to.be.equal(200);
        expect(chaiHttpResponse.body).to.deep.equal(teamsMocks);
    });
    // Testa a rota de get de times por id
    it('Verifies a get in the route to teams:id', async () => {
        // stub do método findOne
        sinon.stub(TeamsModel, "findOne").resolves(teamsMocks[0] as any);
        chaiHttpResponse = await chai.request(app).get('/teams/1').send();
        expect(chaiHttpResponse.status).to.be.equal(200);
        expect(chaiHttpResponse.body).to.deep.equal(teamsMocks[0]);
    });

})