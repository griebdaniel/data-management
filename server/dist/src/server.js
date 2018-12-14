"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var session = require("express-session");
var bodyParser = require("body-parser");
var cors = require("cors");
var mongodb_1 = require("mongodb");
var database_1 = require("./database");
var MongoStore = require('connect-mongo')(session);
var app = express();
var server;
var db;
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
app.post('/login', function (req, res) {
    db.collection('users').findOne({ username: req.body.username, password: req.body.password }).then(function (user) {
        if (user) {
            req.session.isLoggedIn = true;
            res.send(true);
        }
        else {
            res.send(false);
        }
    });
});
app.get('/isLoggedIn', function (req, res) {
    if (req.session.isLoggedIn) {
        res.send(true);
    }
    else {
        res.send(false);
    }
});
app.get('/logOut', function (req, res) {
    req.session.destroy(function () { res.send(true); });
});
app.post('/find', function (req, res) {
    db.collection(req.body.collection).find({}).toArray().then(function (supplies) {
        res.send(supplies);
    });
});
app.post('/update', function (req, res) {
    req.body.filter._id = new mongodb_1.ObjectId(req.body.filter._id);
    db.collection(req.body.collection).update(req.body.filter, req.body.update).then(function (result) {
        res.send(result);
    });
});
app.post('/delete', function (req, res) {
    console.log(req.body.filter);
    req.body.filter._id = new mongodb_1.ObjectId(req.body.filter._id);
    db.collection(req.body.collection).deleteOne(req.body.filter).then(function (result) {
        res.send(result);
    });
});
app.post('/insert', function (req, res) {
    db.collection(req.body.collection).insertOne(req.body.doc).then(function (result) {
        res.send(result.ops[0]._id);
    });
});
app.post('/necessary', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var necessary, inventory;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db.collection('productOrders').aggregate([
                    { $unwind: '$products' }, { $lookup: { from: 'products', localField: 'products.name', foreignField: 'name', as: 'necessary' } },
                    { $unwind: '$necessary' }, { $unwind: '$necessary.necessary' },
                    { $project: { name: 1, total: { $multiply: ['$products.qty', '$necessary.necessary.qty'] }, supply: '$necessary.necessary.name' } },
                    { $group: { _id: { name: '$name', supply: '$supply' }, total: { $sum: '$total' } } },
                    { $group: { _id: '$_id.name', supplies: { $push: { name: '$_id.supply', qty: '$total' } } } },
                    { $project: { ordername: '$_id', required: '$supplies' } }
                ]).toArray()];
            case 1:
                necessary = _a.sent();
                return [4 /*yield*/, db.collection('supplies').find().toArray()];
            case 2:
                inventory = _a.sent();
                necessary.forEach(function (element) {
                    element.required.forEach(function (elem) {
                        inventory.forEach(function (el) {
                            if (elem.name === el.name) {
                                elem.qty -= el.qty;
                                return;
                            }
                        });
                    });
                });
                res.send(necessary);
                return [2 /*return*/];
        }
    });
}); });
function start() {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, app.listen(3000, function () { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, database_1.DataBase.connect()];
                                case 1:
                                    _a.sent();
                                    db = database_1.DataBase.getDB();
                                    console.log('Example app listening on port 3000!');
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
                case 1:
                    server = _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.start = start;
function stop() {
    server.close();
}
exports.stop = stop;
//# sourceMappingURL=server.js.map