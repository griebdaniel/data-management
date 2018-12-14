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
var database_1 = require("./database");
var lodash = require("lodash");
var Scheduler = /** @class */ (function () {
    function Scheduler() {
        this.employeeAssignment = [];
        this.unassignedEmployees = [];
        this.remainingMachines = [];
        this.remainingPhases = [];
        this.activePhases = [];
        this.availablePhases = [];
        this.time = 0;
        this.dbOperations = database_1.DataBase.HelperFunctions;
    }
    Scheduler.prototype.schedule = function () {
        return __awaiter(this, void 0, void 0, function () {
            var assignments;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.DataBase.connect()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, database_1.DataBase.initialize()];
                    case 2:
                        _a.sent();
                        this.initialize();
                        while (this.remainingPhases.length > 0) {
                            assignments = this.dbOperations.getAssignments(this.remainingPhases, this.unassignedEmployees, this.remainingMachines, this.availablePhases);
                            assignments.forEach(function (assignment) { return _this.phaseAssigned(assignment); });
                            this.phaseFinished(lodash.minBy(this.activePhases, function (phase) { return phase.finish; }));
                        }
                        return [2 /*return*/, this.employeeAssignment];
                }
            });
        });
    };
    Scheduler.prototype.initialize = function () {
        var _this = this;
        var productOrder = this.dbOperations.getProductOrder();
        productOrder.products.forEach(function (product) {
            _this.dbOperations.getPhases(product.name).forEach(function (phase) {
                _this.remainingPhases.push({ name: phase.name, count: product.count });
            });
        });
        this.dbOperations.getEmployees().forEach(function (employee) {
            _this.unassignedEmployees.push({ name: employee.name, lastPhase: 'free' });
        });
        this.dbOperations.getEmployees().forEach(function (employee) {
            _this.employeeAssignment.push({ name: employee.name, phases: [] });
        });
        this.dbOperations.getMachines().forEach(function (machine) {
            _this.remainingMachines.push({ name: machine.name, count: machine.count });
        });
    };
    Scheduler.prototype.phaseAssigned = function (assignment) {
        var _this = this;
        lodash.remove(this.unassignedEmployees, function (employee) { return employee.name === assignment.employee; });
        this.remainingMachines.find(function (machine) { return machine.name === _this.dbOperations.getMachine(assignment.phase); }).count--;
        var index = this.availablePhases.indexOf(this.dbOperations.getChildPhase(assignment.phase));
        if (index > 0) {
            this.availablePhases.splice(index, 1);
        }
        this.remainingPhases.find(function (phase) { return phase.name === assignment.phase; }).count--;
        lodash.remove(this.remainingPhases, function (phase) { return phase.count === 0; });
        this.activePhases.push({ name: assignment.phase, employee: assignment.employee, finish: this.time + this.dbOperations.getDuration(assignment.phase) });
        this.employeeAssignment.find(function (employee) { return employee.name === assignment.employee; }).phases.push({ name: assignment.phase, start: this.time });
    };
    Scheduler.prototype.phaseFinished = function (finishedPhase) {
        lodash.remove(this.activePhases, { employee: finishedPhase.employee });
        this.unassignedEmployees.push({ name: finishedPhase.employee, lastPhase: finishedPhase.name });
        lodash.find(this.remainingMachines, { name: this.dbOperations.getMachine(finishedPhase.name) }).count++;
        this.availablePhases.push(finishedPhase.name);
        this.time = finishedPhase.finish;
    };
    return Scheduler;
}());
exports.Scheduler = Scheduler;
var s = new Scheduler();
s.schedule();
//# sourceMappingURL=scheduler.js.map