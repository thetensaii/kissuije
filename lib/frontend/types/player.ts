import { SocketPlayerType } from 'lib/common/socketsTypes';
import { AvatarType } from './svg';

export type PlayerType = {
  id: string;
  avatar: AvatarType;
  name: string;
  character: string;
  isOwner: boolean;
  isPlayer: boolean;
  attempted: boolean;
  wantsToContinue: boolean;
  hasWon: boolean;
};

export type WinnerType = PlayerType & {
  hasWon: true;
};

export type LoserType = PlayerType & {
  hasWon: false;
};

export const isWinner = (player: PlayerType): player is WinnerType => player.hasWon;
export const isLoser = (player: PlayerType): player is LoserType => !player.hasWon;

export const convertSocketPlayerToFrontendPlayer = (
  socketPlayer: SocketPlayerType,
  isOwner = false,
  isPlayer = false
): PlayerType => {
  return {
    ...socketPlayer,
    avatar: AvatarType.AvatarHello,
    isOwner: isOwner,
    isPlayer: isPlayer,
    attempted: false,
    wantsToContinue: false,
    hasWon: false,
  };
};
