import WorkflowBuilder from "../src/workflowBuilder.js";

describe("workflowBuilder", () => {
  let builder;
  beforeEach(() => {
    builder = new WorkflowBuilder();
  });

  describe("with", () => {
    it("adds step to workflow", () => {
      builder.with();
    });
  });
});
