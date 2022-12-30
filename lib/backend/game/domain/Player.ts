export class Player {
  public id: string;
  public name: string;
  public isOwner: boolean;
  public character: string;

  constructor(id: string, name: string, isOwner = false) {
    this.id = id;
    this.name = name;
    this.isOwner = isOwner;
    this.character = '';
  }
}
