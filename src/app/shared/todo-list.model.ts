export class TodoList {
  name: String;
  _links: Object;
  id: number;

  constructor(name: String, links: Object) {
    this.name = name;
    this._links = links;
  }
}
