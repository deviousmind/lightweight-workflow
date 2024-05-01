import WorkflowBuilder from "../src/workflowBuilder.js";
import Step from "../src/step.js";
import { expect } from "chai";

describe("workflowBuilder", () => {
  let builder;
  beforeEach(() => {
    builder = new WorkflowBuilder();
  });

  describe("build", () => {
    it("returns a workflow", () => {
      let workflow = builder.build();

      expect(workflow).to.have.property("steps");
      expect(workflow).to.have.property("execute");
      expect(workflow).to.have.property("undo");
    });
  });

  describe("clear", () => {
    it("resets a workflow", () => {
      let workflow = builder.with(new Step()).with(new Step()).with(new Step()).clear().build();

      expect(workflow.steps.length).to.equal(0);
      expect(workflow).to.have.property("steps");
      expect(workflow).to.have.property("execute");
      expect(workflow).to.have.property("undo");
    });

    it("returns the builder for chaining", () => {
      let result = builder.clear();
      expect(result).to.equal(builder);
    });
  });

  describe("with", () => {
    it("adds step to workflow", () => {
      let step1 = new Step();
      let step2 = new Step();

      builder.with(step1);
      builder.with(step2);
      let workflow = builder.build();

      expect(workflow.steps.length).to.equal(2);
      expect(workflow.steps[0].name).to.equal(step1.name);
      expect(workflow.steps[1].name).to.equal(step2.name);
    });

    it("returns the builder for chaining", () => {
      let result = builder.with(new Step());
      expect(result).to.equal(builder);
    });
  });

  describe("withDependency", () => {
    it("throws an error if there are no dependant steps", () => {
      expect(() => {
        builder.withDependency(new Step()).build();
      }).to.throw("Cannot add a dependant when there are no steps");
    });

    it("adds step to workflow before last step if not in the steps already", () => {
      let step1 = new Step("Step 1");
      let step2 = new Step("Step 2");

      let workflow = builder.with(step2)
                            .withDependency(step1)
                            .build();

      expect(workflow.steps.length).to.equal(2);
      expect(workflow.steps[0].name).to.equal(step1.name);
      expect(workflow.steps[1].name).to.equal(step2.name);
    });

    it("adds step to workflow before last steps last dependent if not in the steps already", () => {
      let step1 = new Step("Step 1");
      let step2 = new Step("Step 2");
      let step3 = new Step("Step 3");
      let step4 = new Step("Step 4");

      let workflow = builder.with(step4)
                            .withDependency(step3)
                            .withDependency(step2)
                            .withDependency(step1)
                            .build();

      expect(workflow.steps.length).to.equal(4);
      expect(workflow.steps[0].name).to.equal(step1.name);
      expect(workflow.steps[1].name).to.equal(step2.name);
      expect(workflow.steps[2].name).to.equal(step3.name);
      expect(workflow.steps[3].name).to.equal(step4.name);
    });

    it("does not add the dependant if it is already in the list", () => {
      let step1 = new Step("Step 1");
      let step2 = new Step("Step 2");
      let step3 = new Step("Step 3");
      let workflow = builder.with(step2)
                            .withDependency(step1)
                            .with(step3)
                            .withDependency(step1)
                            .build();

      expect(workflow.steps.length).to.equal(3);
      expect(workflow.steps[0].name).to.equal(step1.name);
      expect(workflow.steps[1].name).to.equal(step2.name);
      expect(workflow.steps[2].name).to.equal(step3.name);
    });

    it("returns the builder for chaining", () => {
      let result = builder.with(new Step());
      expect(result).to.equal(builder);
    });
  });
});
