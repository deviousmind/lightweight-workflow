import WorkflowBuilder from "../src/workflowBuilder.js";
import Step from "../src/step.js";
import { expect } from "chai";

describe("workflowBuilder", () => {
  let builder;
  beforeEach(() => {
    builder = new WorkflowBuilder();
  });

  describe("with", () => {
    it("adds step to workflow", () => {
      let step1 = new Step();
      let step2 = new Step();

      builder.with(step1);
      builder.with(step2);

      expect(builder.steps[0]).to.equal(step1);
      expect(builder.steps[1]).to.equal(step2);
    });
  });
});
