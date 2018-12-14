import { logger } from '../src/logger';
import { Scheduler } from '../src/scheduler';
import { Assignment } from '../src/types';
import { start, stop } from '../src/server'
import * as request from 'request';

const baseUrl = 'http://localhost:3000/';

function find(collection: string, filter: object, projection?: any): Promise<any> {
	const data = {
		collection: collection,
		filter: filter,
		projection: projection ? projection : {}
	};

	const header = {
		url: baseUrl + 'find',
		method: 'POST',
		json: data
	};

	return new Promise((resolve, reject) => {
		request(header, (err, res, body) => {
			if (err || res.statusCode != 200) {
				reject(err);
			}
			resolve(body);
		});
	});
}

xdescribe('server', () => {
	// beforeAll(async done => {
	// 	await start();
	// 	done();
	// });

	// afterAll(() => {
	// 	stop();
	// });

	// it('schedule', done => {
	// 	const scheduler = new Scheduler();

	// 	scheduler.schedule().then((res: Assignment[]) => {
	// 		console.log(JSON.stringify(res));
	// 		done()
	// 	});

	// 	expect(true).toBe(true);
	// });

	// it('find', async done => {
	// 	find('employees', {}).then(res => {
	// 		// console.log(res);
	// 		done()
	// 	});		
	// })

});