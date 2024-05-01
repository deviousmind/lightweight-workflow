import { randomBytes } from "node:crypto";

export default class Step {
  constructor(name, props) {
    Object.assign(this, props);
    this.name = name || randomBytes(20).toString("hex");
  }

  static executor(name, ...args) {
    return this.bind(this, name, ...args);
  }

  async execute() {
    throw new Error("Only derived types may be executed.");
  }

  async undo() {
    throw new Error("Only derived types may be undone.");
  }

  get [Symbol.toStringTag]() {
    return `Step_${this["name"]}`;
  }
}
