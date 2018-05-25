import * as express from 'express';
import * as session from 'express-session';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { Db, MongoClient, ObjectId } from 'mongodb';

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
  if (req.session.isLoggedIn) {
    res.send(true);
  } else {
    res.send(false);
  }
});

app.get('/logOut', (req: express.Request, res: express.Response) => {
  req.session.destroy(() => { res.send(true) });
});

app.post('/find', (req: express.Request, res: express.Response) => {
  db.collection(req.body.collection).find({}).toArray().then(supplies => {
    res.send(supplies);
  });
});

app.post('/update', (req: express.Request, res: express.Response) => {
  req.body.filter._id = new ObjectId(req.body.filter._id);
  db.collection(req.body.collection).update(req.body.filter, req.body.update).then(result => {
    res.send(result);
  });
});

app.post('/delete', (req: express.Request, res: express.Response) => {
  console.log(req.body.filter);
  req.body.filter._id = new ObjectId(req.body.filter._id);
  db.collection(req.body.collection).deleteOne(req.body.filter).then(result => {
    res.send(result);
  });
});

app.post('/insert', (req: express.Request, res: express.Response) => {
  db.collection(req.body.collection).insertOne(req.body.doc).then(result => {
    res.send(result.ops[0]._id);
  });
});

app.listen(3000, async () => {
  const client = await MongoClient.connect('mongodb://localhost:27017/');
  db = client.db('test');
  console.log('Example app listening on port 3000!')
});