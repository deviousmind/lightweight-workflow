export default class WorkflowBuilder {
  with(step) {
    return this;
  }

  build() {
    return new Workflow();
  }
}

class Workflow {
  constructor(steps) {
    this.steps = steps;
  }

  async execute() {
    for (const step of this.steps) {
      await new step().execute();
    }
  }

  async undo() {
    for (const step of this.steps) {
      await new step().execute();
    }
  }
}
