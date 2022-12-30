import { getRandomElementFromArray, isStringEmpty, shuffleArray } from 'lib/common/functions';
import { NotEnoughPlayerError } from './errors/NotEnoughPlayerError';
import { PlayerNotFoundError } from './errors/PlayerNotFoundError';
import { Player } from './Player';
export type PlayerBindToPlayerType = Record<Player['id'], Player['id']>;
export class Players {
  private playersArray: Player[];

  constructor(...playersArray: Player[]) {
    this.playersArray = playersArray;
  }

  public getPlayer(playerId: Player['id']): Player {
    const player = this.playersArray.find((p) => p.id === playerId);
    if (!player) throw new PlayerNotFoundError();

    return player;
  }

  public getAll(): Player[] {
    return this.playersArray;
  }

  public addPlayer(player: Player): boolean {
    this.playersArray.push(player);
    return true;
  }

  public removePlayer(playerId: Player['id']): boolean {
    this.playersArray = this.playersArray.filter((p) => p.id !== playerId);

    return true;
  }

  public getWhoPickCharacterForWho(): PlayerBindToPlayerType {
    if (this.playersArray.length < 2) throw new NotEnoughPlayerError();
    const playersIds = this.playersArray.map((p) => p.id);
    let playersIdsCopy = [...playersIds];

    let target: string;
    const empty: PlayerBindToPlayerType = {};

    const result = playersIds.reduce((acc, playerId) => {
      do {
        target = getRandomElementFromArray(playersIdsCopy);
      } while (target === playerId);

      playersIdsCopy = playersIdsCopy.filter((pid) => target !== pid);

      acc[playerId] = target;

      return acc;
    }, empty);

    return result;
  }

  public doAllPlayersHaveCharacter(): boolean {
    return this.playersArray.every((p) => !isStringEmpty(p.character));
  }

  public shuffleOrder(): Player[] {
    this.playersArray = shuffleArray([...this.playersArray]);

    return this.playersArray;
  }
}
