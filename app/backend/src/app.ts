// importando os módulos e arquivos necessários
import * as express from 'express';
import authRoute from './routes/AuthRoute';
import listTeamsRoute from './routes/listTeamsRoute';
import listMatchesRoute from './routes/listMatchesRoute';
import leaderBoardRoute from './routes/leaderBoardRoute';
import 'express-async-errors';
import HttpErrorMiddleware from './middlewares/HttpErrorMiddleware';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    // Adiciona o middleware de rota de autenticação para a rota '/login'
    this.app.use('/login', authRoute);
    // Adiciona o middleware de rota de listagem de times para a rota '/teams'
    this.app.use('/teams', listTeamsRoute);
    // Adiciona o middleware de rota de listagem de partidas para a rota '/matches'
    this.app.use('/matches', listMatchesRoute);
    // Adiciona o middleware de rota de listagem de leaderboard para a rota '/leaderboard'
    this.app.use('/leaderboard', leaderBoardRoute);
    // Adiciona uma rota raiz que retorna um json com a propriedade 'ok' com valor true.
    this.app.get('/', (req, res) => res.json({ ok: true }));

    this.app.use(HttpErrorMiddleware);
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export default App;
