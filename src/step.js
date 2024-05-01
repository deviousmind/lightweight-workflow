export default class Step {
  constructor(props) {
    Object.assign(this, props);
  }
  static executor(args) {
    return this.bind(this, args);
  }
  async execute() {
    throw new Error("Only derived types may be executed.");
  }
  async undo() {
    throw new Error("Only derived types may be undone.");
  }
}
