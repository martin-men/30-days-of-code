export class Commit {
  constructor(data, name) {
    this.data = data;
    this.next = null;
    this.branch = name;
  }
}
