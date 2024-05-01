import Step from "../src/step.js";
import { expect } from "chai";

describe("step", () => {
  let step;

  beforeEach(() => {
    step = new Step();
  });

  describe("executor", () => {
    it("returns constructor for the type with all args bound", () => {
      const i = 123;
      const cant = {};
      const even = NaN;

      const executor = Step.executor({"i": i, "cant": cant, "even": even});

      const actual = new executor();
      expect(actual.i).to.equal(i);
      expect(actual.cant).to.equal(cant);
      expect(actual.even).to.eql(even);
    });
  });
});
