import { DataBase } from './database';
import * as lodash from 'lodash';
import { Assignment } from './types';



export class Scheduler {
  employeeAssignment: Assignment[] = [];
  unassignedEmployees: Array<{ name: string, lastPhase: string }> = [];
  remainingMachines: Array<{ name: string, count: number }> = [];
  remainingPhases: Array<{ name: string, count: number }> = [];
  activePhases: Array<{ name: string, employee: string, finish: number }> = [];
  availablePhases: string[] = [];

  time: number = 0;

  dbOperations = DataBase.HelperFunctions ;

  constructor() { }

  async schedule(): Promise<Assignment[]> {
    await DataBase.connect();
    await DataBase.initialize();

    this.initialize();

    while (this.remainingPhases.length > 0) {
      const assignments = this.dbOperations.getAssignments(this.remainingPhases, this.unassignedEmployees, this.remainingMachines, this.availablePhases);
      assignments.forEach(assignment => this.phaseAssigned(assignment));
      this.phaseFinished(lodash.minBy(this.activePhases, phase => phase.finish));
    }

    return this.employeeAssignment;
  }

  initialize() {
    const productOrder = this.dbOperations.getProductOrder();
    productOrder.products.forEach(product => {
      this.dbOperations.getPhases(product.name).forEach(phase => {
        this.remainingPhases.push({ name: phase.name, count: product.count });
      });
    });

    this.dbOperations.getEmployees().forEach(employee => {
      this.unassignedEmployees.push({ name: employee.name, lastPhase: 'free' });
    });

    this.dbOperations.getEmployees().forEach(employee => {
      this.employeeAssignment.push({ name: employee.name, phases: [] });
    });

    this.dbOperations.getMachines().forEach(machine => {
      this.remainingMachines.push({ name: machine.name, count: machine.count });
    });
  }

  phaseAssigned(assignment: { employee: string, phase: string }) {
    lodash.remove(this.unassignedEmployees, employee => employee.name === assignment.employee);
    this.remainingMachines.find(machine => machine.name === this.dbOperations.getMachine(assignment.phase)).count--;
    let index = this.availablePhases.indexOf(this.dbOperations.getChildPhase(assignment.phase))
    if (index > 0) {
      this.availablePhases.splice(index, 1);
    }
    this.remainingPhases.find(phase => phase.name === assignment.phase).count--;
    lodash.remove(this.remainingPhases, phase => phase.count === 0);
    this.activePhases.push({ name: assignment.phase, employee: assignment.employee, finish: this.time + this.dbOperations.getDuration(assignment.phase) });
    this.employeeAssignment.find(employee => employee.name === assignment.employee).phases.push({ name: assignment.phase, start: this.time });
  }

  phaseFinished(finishedPhase: { name: string, employee: string, finish: number }) {
    lodash.remove(this.activePhases, { employee: finishedPhase.employee });
    this.unassignedEmployees.push({ name: finishedPhase.employee, lastPhase: finishedPhase.name });
    lodash.find(this.remainingMachines, { name: this.dbOperations.getMachine(finishedPhase.name) }).count++;
    this.availablePhases.push(finishedPhase.name);
    this.time = finishedPhase.finish;
  }

}

let s = new Scheduler();
s.schedule();