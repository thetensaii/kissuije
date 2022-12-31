export class Player {
  public id: string;
  public name: string;
  public character: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
    this.character = '';
  }
}
