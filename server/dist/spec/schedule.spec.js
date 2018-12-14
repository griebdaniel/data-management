"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var scheduler_1 = require("../src/scheduler");
var server_1 = require("../src/server");
var request = require("request");
var baseUrl = 'http://localhost:3000/';
function find(collection, filter, projection) {
    console.log(collection);
    var data = {
        collection: collection,
        filter: filter,
        projection: projection ? projection : {}
    };
    var header = {
        url: baseUrl + 'find',
        method: 'POST',
        json: data
    };
    return new Promise(function (resolve, reject) {
        request(header, function (err, res, body) {
            if (err || res.statusCode != 200) {
                reject(err);
            }
            resolve(body);
        });
    });
}
describe('server', function () {
    beforeAll(function (done) {
        server_1.start().then(function () { return done(); });
    });
    afterAll(function () {
        server_1.stop();
    });
    it('schedule', function (done) {
        var scheduler = new scheduler_1.Scheduler();
        scheduler.schedule().then(function (res) {
            console.log(JSON.stringify(res));
            done();
        });
        expect(true).toBe(true);
    });
    fit('find', function (done) {
        find('employees', {}).then(function (res) {
            console.log(res);
            // expect(true).toBe(true);
            done();
        });
    });
});
//# sourceMappingURL=schedule.spec.js.map