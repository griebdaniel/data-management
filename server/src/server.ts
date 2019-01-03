import * as express from 'express';
import { } from 'express'
import * as session from 'express-session';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { Scheduler } from './scheduler';
import { } from './types';
import { ObjectId, Db } from 'mongodb';

import { DataBase } from './database';
import { Server, createServer } from 'http';
import * as socketIo from 'socket.io';
import { connect, find, updateChanges } from './relational';
import { Subject } from 'rxjs';
import { SocketConstructorOpts } from 'net';


const MongoStore = require('connect-mongo')(session);
const app: express.Application = express();
let server: Server;
let io: SocketIO.Server;
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




app.post('/necessary', async (req: express.Request, res: express.Response) => {
  const necessary = await db.collection('productOrders').aggregate([
    { $unwind: '$products' }, { $lookup: { from: 'products', localField: 'products.name', foreignField: 'name', as: 'necessary' } },
    { $unwind: '$necessary' }, { $unwind: '$necessary.necessary' },
    { $project: { name: 1, total: { $multiply: ['$products.qty', '$necessary.necessary.qty'] }, supply: '$necessary.necessary.name' } },
    { $group: { _id: { name: '$name', supply: '$supply' }, total: { $sum: '$total' } } },
    { $group: { _id: '$_id.name', supplies: { $push: { name: '$_id.supply', qty: '$total' } } } },
    { $project: { ordername: '$_id', required: '$supplies' } }]).toArray();

  const inventory = await db.collection('supplies').find().toArray();

  necessary.forEach(element => {
    element.required.forEach(elem => {
      inventory.forEach(el => {
        if (elem.name === el.name) {
          elem.qty -= el.qty;
          return;
        }
      });
    });
  });

  res.send(necessary);
})


app.post('/updateTable', async (req: express.Request, res: express.Response) => {
  res.send(await updateChanges(req.body.table, req.body.modifications));
});

app.post('/findTable', async (req: express.Request, res: express.Response) => {
  const table = await find(req.body.table);
  res.send(table);
});


async function start() {
  await DataBase.connect();
  db = DataBase.getDB();

  await connect();

  await new Promise((resolve, rejects) => {
    server = createServer(app);
    io = socketIo(server);

    io.on('connection', (socket: SocketIO.Socket) => {
      console.log('connected io');
      setInterval(() => {
        socket.emit('message', 'SocketIO is cool!');
      }, 1000);
    });

    server.listen(3000, () => {
      resolve(true);
    });

  });
}

function stop() {
  server.close();
}

// start().then(() => { console.log('App listening on port 3000!'); });

export { start, stop }