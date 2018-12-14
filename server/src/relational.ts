import 'reflect-metadata';
import { createConnection, Connection } from 'typeorm';
import lodash = require('lodash');


let connection: Connection

export async function connect() {
  connection = await createConnection();
}

export async function disconnect() {
  await connection.close();
}



export async function find(table: string, relations?: string[]) : Promise<any> {
  const repository = await connection.getRepository(table);
  return repository.find({ relations: relations });
}

export async function updateChanges(table: string, newEntities: any) {
  const repository = await connection.getRepository(table);
  const currentEntities = await repository.find();
  const primaryKey: string = lodash.find(repository.metadata.ownColumns, { isPrimary: true }).propertyName;
  const entitiesToRemove = lodash.differenceBy(currentEntities, newEntities, (entity: any) => { return entity[primaryKey] });

  // await repository.remove(entitiesToRemove);
  await repository.save(newEntities);
}




export async function insert(table: string, row: object) {
  const repository = await connection.getRepository(table);
  const queryBuilder = repository.createQueryBuilder();
  await queryBuilder.insert().into(table).values(row).execute();
}

export async function update2(table: string, rows: any[], columns: string[], value: any, operation?: 'insert' | 'delete' | 'update') {
  const repository = await connection.getRepository(table);
  let tableRows: any = await find(table);
  let cell = tableRows;

  for (let i = 0; i < rows.length; i++) {
    let row = lodash.find(cell, rows[i]);
    cell = row[columns[i]];

    if (i === rows.length - 1) {
      switch (operation) {
        case 'insert':
          cell.push(value);
          break;
        // case 'delete':
        //   lodash.remove(cell, value);
        //   break;
        // case 'update':
        //   const relation = await connection.getRepository(row.constructor.name).find();
        //   const value2 = {};
        //   value2[column[i]] = value; 
        //   const row2 = lodash.find(relation, value2);
        //   for (const key in row2) {
        //     row[key] = row2[key];
        //   }

        // break;
        default:
          break;
      }
    }
  }
}
