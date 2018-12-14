import { Db, MongoClient } from 'mongodb';
import { Product, Machine, Employee, ProductOrder } from './types';
import * as lodash from 'lodash';

export class DataBase {
  private static db: Db;
  private static machines: Machine[];
  private static products: Product[];
  private static employees: Employee[];
  private static productOrders: ProductOrder[];
  
  static async connect() {
    if (DataBase.db) {
      return;
    }

    const client = await MongoClient.connect('mongodb://localhost:27017/', { useNewUrlParser: true });
    DataBase.db = client.db('test');
  }
  
  static async initialize() {
    DataBase.machines = await DataBase.db.collection('machines').find({}).toArray();
    DataBase.products = await DataBase.db.collection('products').find({}).toArray();
    DataBase.employees = await DataBase.db.collection('employees').find({}).toArray();
    DataBase.productOrders = await DataBase.db.collection('productOrders').find({}).toArray();
  }

  static getDB(): Db {
    return DataBase.db;
  }

  static HelperFunctions = {
    getProductOrder() {
      return DataBase.productOrders[0];
    },
  
    getEmployees() {
      return DataBase.employees;
    },
  
    getMachines() {
      return DataBase.machines;
    },
  
    getPhases(product: string) {
      return lodash.find(DataBase.products, { name: product }).phases;
    },
  
    getParentPhase(phase: string) {
      const phases = lodash.find(DataBase.products, (product: Product) => lodash.find(product.phases, { name: phase }) !== undefined).phases;
      const index = lodash.findIndex(phases, { name: phase });
      if (index === phases.length - 1) {
        return undefined;
      } else {
        return phases[index + 1].name;
      }
    },
  
    getChildPhase(phase: string): string {
      const phases = lodash.find(DataBase.products, (product: Product) => lodash.find(product.phases, { name: phase }) !== undefined).phases;
      const index = lodash.findIndex(phases, { name: phase });
      if (index === 0) {
        return undefined;
      } else {
        return phases[index - 1].name;
      }
    },
  
    getMachine(phase: string) {
      return lodash.find(
        lodash.find(DataBase.products, (product: Product) => { return lodash.find(product.phases, { name: phase }) !== undefined }).phases, { name: phase }).machine;
    },
  
    getDuration(phase: string): number {
      const phases = lodash.find(DataBase.products, (product: Product) => lodash.find(product.phases, { name: phase }) !== undefined).phases;
      return lodash.find(phases, { name: phase }).duration;
    },
  
    getSkill(phase: string) {
      const machine = lodash.find(
        lodash.find(DataBase.products, (product: Product) => {
          return lodash.find(product.phases, { name: phase }) !== undefined
        }).phases, { name: phase }
      ).machine;
  
      const skill = lodash.find(DataBase.machines, { name: machine }).skill;
  
      return skill;
    },
  
    isAssignable(employee: string, phase: string) {
      return this.hasSkill(employee, this.getSkill(phase));
    },
  
    hasSkill(employee: string, skill: string) {
      const skills = lodash.find(DataBase.employees, { name: employee }).skills;
      return lodash.find(skills, { name: skill }) === undefined ? false : true;
    },
  
  
    getAssignments(phases: Array<{ name: string, count: number }>, employees: Array<{ name: string, lastPhase: string }>, machines: Array<{ name: string, count: number }>, phasesAvailable: string[]) {
      phases = lodash.cloneDeep(phases);
      machines = lodash.cloneDeep(machines);
      phasesAvailable = lodash.cloneDeep(phasesAvailable);
  
      const assignments: Array<{ employee: string, phase: string }> = [];
  
      employees.forEach(employee => {
        let bestPhase: string;
  
        for (let phase of phases) {
          let machine = this.getMachine(phase.name);
          if (
            this.isAssignable(employee.name, phase.name) &&
            machines.find(remainingMachine => remainingMachine.name === machine).count > 0 &&
            (this.getChildPhase(phase.name) === undefined || (phasesAvailable.indexOf(this.getChildPhase(phase.name)) > -1))
          ) {
            if (phase.name === employee.lastPhase) {
              bestPhase = phase.name;
              break;
            }
            bestPhase = phase.name;
          }
        }
  
        if (bestPhase) {
          phases.find(phase => phase.name === bestPhase).count--;
          machines.find(machine => machine.name === this.getMachine(bestPhase)).count--;
          let index = phasesAvailable.indexOf(this.getChildPhase(bestPhase))
          if (index > 0) {
            phasesAvailable.splice(index, 1);
          }
  
          assignments.push({ employee: employee.name, phase: bestPhase });
        }
      });
  
      return assignments;
    }
  }

  
}

