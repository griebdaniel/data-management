import { db } from './server';
import { Order, OrderedProduct, Phase, Product, ScheduledPhase, ScheduledPhases, TimedPhase, Employee } from './types';

const phases: Phase[] = [];
const employees: Employee[] = [];


function schedulePhases() {
  const schedulePhase = (phase: Phase) => {
    const machineAvailable = (phase: Phase): Boolean => {
      return true;
    };

    const scheduleToFreeEmployee = (phase: Phase): Boolean => {
      return true;
    };

    const exchangeWithLowerPriorityPhase = (phase: Phase): Boolean => {
      return true;
    };

    if (machineAvailable(phase)) {
      if (!scheduleToFreeEmployee(phase)) {
        exchangeWithLowerPriorityPhase(phase);
      }
    }
  }

  phases.forEach(phase => {
    schedulePhase(phase);
  });
}

function schedule() {
  let scheduleFinished = false;

  while (!scheduleFinished) {
    schedulePhases();

  }
}


export { schedule };