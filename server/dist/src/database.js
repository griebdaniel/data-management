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
Object.defineProperty(exports, "__esModule", { value: true });
var mongodb_1 = require("mongodb");
var lodash = require("lodash");
var DataBase = /** @class */ (function () {
    function DataBase() {
    }
    DataBase.connect = function () {
        return __awaiter(this, void 0, void 0, function () {
            var client;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (DataBase.db) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, mongodb_1.MongoClient.connect('mongodb://localhost:27017/', { useNewUrlParser: true })];
                    case 1:
                        client = _a.sent();
                        DataBase.db = client.db('test');
                        return [2 /*return*/];
                }
            });
        });
    };
    DataBase.initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = DataBase;
                        return [4 /*yield*/, DataBase.db.collection('machines').find({}).toArray()];
                    case 1:
                        _a.machines = _e.sent();
                        _b = DataBase;
                        return [4 /*yield*/, DataBase.db.collection('products').find({}).toArray()];
                    case 2:
                        _b.products = _e.sent();
                        _c = DataBase;
                        return [4 /*yield*/, DataBase.db.collection('employees').find({}).toArray()];
                    case 3:
                        _c.employees = _e.sent();
                        _d = DataBase;
                        return [4 /*yield*/, DataBase.db.collection('productOrders').find({}).toArray()];
                    case 4:
                        _d.productOrders = _e.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DataBase.getDB = function () {
        return DataBase.db;
    };
    DataBase.HelperFunctions = {
        getProductOrder: function () {
            return DataBase.productOrders[0];
        },
        getEmployees: function () {
            return DataBase.employees;
        },
        getMachines: function () {
            return DataBase.machines;
        },
        getPhases: function (product) {
            return lodash.find(DataBase.products, { name: product }).phases;
        },
        getParentPhase: function (phase) {
            var phases = lodash.find(DataBase.products, function (product) { return lodash.find(product.phases, { name: phase }) !== undefined; }).phases;
            var index = lodash.findIndex(phases, { name: phase });
            if (index === phases.length - 1) {
                return undefined;
            }
            else {
                return phases[index + 1].name;
            }
        },
        getChildPhase: function (phase) {
            var phases = lodash.find(DataBase.products, function (product) { return lodash.find(product.phases, { name: phase }) !== undefined; }).phases;
            var index = lodash.findIndex(phases, { name: phase });
            if (index === 0) {
                return undefined;
            }
            else {
                return phases[index - 1].name;
            }
        },
        getMachine: function (phase) {
            return lodash.find(lodash.find(DataBase.products, function (product) { return lodash.find(product.phases, { name: phase }) !== undefined; }).phases, { name: phase }).machine;
        },
        getDuration: function (phase) {
            var phases = lodash.find(DataBase.products, function (product) { return lodash.find(product.phases, { name: phase }) !== undefined; }).phases;
            return lodash.find(phases, { name: phase }).duration;
        },
        getSkill: function (phase) {
            var machine = lodash.find(lodash.find(DataBase.products, function (product) {
                return lodash.find(product.phases, { name: phase }) !== undefined;
            }).phases, { name: phase }).machine;
            var skill = lodash.find(DataBase.machines, { name: machine }).skill;
            return skill;
        },
        isAssignable: function (employee, phase) {
            return this.hasSkill(employee, this.getSkill(phase));
        },
        hasSkill: function (employee, skill) {
            var skills = lodash.find(DataBase.employees, { name: employee }).skills;
            return lodash.find(skills, { name: skill }) === undefined ? false : true;
        },
        getAssignments: function (phases, employees, machines, phasesAvailable) {
            var _this = this;
            phases = lodash.cloneDeep(phases);
            machines = lodash.cloneDeep(machines);
            phasesAvailable = lodash.cloneDeep(phasesAvailable);
            var assignments = [];
            employees.forEach(function (employee) {
                var bestPhase;
                var _loop_1 = function (phase) {
                    var machine = _this.getMachine(phase.name);
                    if (_this.isAssignable(employee.name, phase.name) &&
                        machines.find(function (remainingMachine) { return remainingMachine.name === machine; }).count > 0 &&
                        (_this.getChildPhase(phase.name) === undefined || (phasesAvailable.indexOf(_this.getChildPhase(phase.name)) > -1))) {
                        if (phase.name === employee.lastPhase) {
                            bestPhase = phase.name;
                            return "break";
                        }
                        bestPhase = phase.name;
                    }
                };
                for (var _i = 0, phases_1 = phases; _i < phases_1.length; _i++) {
                    var phase = phases_1[_i];
                    var state_1 = _loop_1(phase);
                    if (state_1 === "break")
                        break;
                }
                if (bestPhase) {
                    phases.find(function (phase) { return phase.name === bestPhase; }).count--;
                    machines.find(function (machine) { return machine.name === _this.getMachine(bestPhase); }).count--;
                    var index = phasesAvailable.indexOf(_this.getChildPhase(bestPhase));
                    if (index > 0) {
                        phasesAvailable.splice(index, 1);
                    }
                    assignments.push({ employee: employee.name, phase: bestPhase });
                }
            });
            return assignments;
        }
    };
    return DataBase;
}());
exports.DataBase = DataBase;
//# sourceMappingURL=database.js.map