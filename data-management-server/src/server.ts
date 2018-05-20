import * as express from 'express';
import * as session from 'express-session';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { Db, MongoClient } from 'mongodb';

const MongoStore = require('connect-mongo')(session);
const app: express.Express = express();
let db: Db;

app.use(session({
  store: new MongoStore({ url: 'mongodb://localhost:27017/test' }),
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use(cors({  
  origin: ['http://localhost:4200'],
  credentials: true
}));

app.use(bodyParser.json());

app.post('/login', (req: express.Request, res: express.Response) => {
  db.collection('users').findOne({ username: req.body.username, password: req.body.password }).then(user => {
    if (user) {
      req.session.isLoggedIn = true;
      res.send(true);
    } else {
      res.send(false);
    }
  });
});

app.get('/isLoggedIn', (req: express.Request, res: express.Response) => {
  console.log(req.session.isLoggedIn);
  if (req.session.isLoggedIn) {
    res.send(true);
  } else {
    res.send(false);
  }
});

app.get('/logOut', (req: express.Request, res: express.Response) => {
  req.session.destroy(() => { res.send(true) });
});

app.listen(3000, async () => {
  const client = await MongoClient.connect('mongodb://localhost:27017/');
  db = client.db('test');
  console.log('Example app listening on port 3000!')
});