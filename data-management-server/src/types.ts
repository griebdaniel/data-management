class ScheduledPhase {
  order: string;
  product: string;
  phase: string;
}

class TimedPhase {
  phase: ScheduledPhase;
  time: number;
}

class ScheduledPhases {
  employee: string;
  phases: TimedPhase[];
}

class Phase {
  name: string;
  time: number;
  machine: string;
}

class Product {
  name: string;
  phases: Phase[];
}

class OrderedProduct {
  name: string;
  qty: number;
}

class Order {
  name: string;
  deadline: Date;
  products: OrderedProduct[];
}

class Employee {
  name: string;
  skills: Array<{ name: string }>;
}

export { Employee, ScheduledPhase, TimedPhase, ScheduledPhases, Phase, Product, OrderedProduct, Order };