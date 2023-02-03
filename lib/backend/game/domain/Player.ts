export class Player {
  public id: string;
  public name: string;
  public character: string;
  public avatar: string;

  constructor(id: string, name: string, avatar: string) {
    this.id = id;
    this.name = name;
    this.character = '';
    this.avatar = avatar;
  }
}
