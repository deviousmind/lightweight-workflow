export default class WorkflowBuilder {
  constructor() {
    this.workflow = new Workflow();
  }

  with(step) {
    this.workflow.addStep(step);
    return this;
  }

  withDependency(dependency) {
    if (this.workflow.steps.length === 0) {
      throw new Error("Cannot add a dependant when there are no steps");
    } else {
      this.workflow.addDependency(dependency);
    }

    return this;
  }

  build() {
    return this.workflow;
  }

  clear() {
    this.workflow = new Workflow();
    return this;
  }
}

class Workflow {
  constructor(steps) {
    this.steps = steps || [];
  }

  addStep(step, index) {
    for (const workflowStep of this.steps) {
      if (workflowStep.name === step.name) {
        console.warn(`A matching step is already in the workflow.`);
        return;
      }
    }
    let newStep = { name: step.name, step: step, dependencies: [] };
    if (index >= 0) {
      this.steps.splice(index, 0, newStep);
    } else {
      this.steps.push(newStep);
    }
  }

  addDependency(dependency) {
    let lastIndex = this.steps.length - 1;
    let lastStep = this.steps[lastIndex];
    if (lastStep.dependencies.length === 0) {
      lastStep.dependencies.push(dependency);
      this.addStep(dependency, lastIndex);
      return;
    }
    for (const workflowStep of lastStep.dependencies) {
      if (workflowStep.name === dependency.name) {
        console.warn(`Step ${lastStep.name} already depends on ${dependency.name}`);
        return;
      }
    }
    let lastDependency = lastStep.dependencies[lastStep.dependencies.length - 1];
    let lastDependencyIndex = this.steps.findIndex(s => s.name === lastDependency.name);
    lastStep.dependencies.push(dependency);
    this.addStep(dependency, lastDependencyIndex);
  }

  async execute() {
    for (const step of this.steps) {
      await new step().execute();
    }
  }

  async undo() {
    for (const step of this.steps) {
      await new step().undo();
    }
  }
}
