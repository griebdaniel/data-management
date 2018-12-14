import "reflect-metadata";
import { connect, disconnect, find, updateChanges } from '../src/relational'
import { Product } from '../src/entity/product';
import { Necessary } from '../src/entity/necessary';
import lodash = require('lodash');
import { doesNotThrow } from 'assert';



describe('server', () => {

	beforeAll(async done => {
		await connect();
		done();
	});

	afterAll(async done => {
		await disconnect();
		done();
	})

	it('insert', async done => {
		const supplies = await find('supplies');
		const product = new Product();
		product.name = 'p1';
		product.necessary = [];
		product.necessary.push({ supply: supplies[0], quantity: 0 }, { supply: supplies[1], quantity: 1 });

		console.log(product.necessary);

		await updateChanges('products', [product]);

		const updatedProducts = await find('products');
		console.log(updatedProducts[0].necessary);

		done();
	});

	it('insert OneToMany', async done => {
		const supplies = await find('supplies');
		const products = await find('products');

		products[0].necessary.push({ supply: supplies[2], quantity: 2 }, { supply: supplies[3], quantity: 3 }, { supply: supplies[4], quantity: 3 } );

		console.log(products[0].necessary);

		await updateChanges('products', products);

		const updatedProducts = await find('products');
		console.log(updatedProducts[0].necessary);

		done();
	});

	it('delete OneToMany', async done => {
		const products = await find('products');

		lodash.remove(products[0].necessary, (necessary: any) => necessary.supply.name === 's4' ||  necessary.supply.name === 's3')
		console.log(products[0].necessary);

		await updateChanges('products', products);

		const updatedProducts = await find('products');
		console.log(updatedProducts[0].necessary);

		done();
	});

	fit('upodate OneToMany', async done => {
		const supplies: any = await find('supplies');
		let products: any = await find('products');
		let supply = lodash.find(supplies, { name: 's5' });

		products[0].necessary[1].quantity = 4;
		products[0].necessary[1].supply = supply;

		await updateChanges('products', [products[0]])

		products = await find('products');
		console.log(products[0].necessary);

		done();
	});

});