class ProductOrder {
  name: string;
  products: [{ name: string, count: number }];
}

class Product {
  name: string;
  phases: [{ name: string, duration: number, machine: string }];
}

class Machine {
  name: string;
  skill: string;
  count: number;
}

class Employee {
  name: string;
  skills: string[];
}

class MachineCounter {
  name: string;
  count: number;
}

class PhaseCounter {
  name: string;
  count: number;
}

class Assignment {
  name: string;
  phases: Array<{ name: string, start: number }>;
}

class Modifications {
  action: 'insert' | 'delete' | 'update';
  position: Array<{ row: object, column: string }>;
  value: any;
}

export { Product, Machine, Employee, ProductOrder, MachineCounter, PhaseCounter, Assignment, Modifications };