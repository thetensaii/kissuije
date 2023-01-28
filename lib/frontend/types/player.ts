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

export const convertSocketPlayerToFrontendPlayer = (socketPlayer: SocketPlayerType): PlayerType => {
  return {
    ...socketPlayer,
    avatar: AvatarType.AvatarHello,
    isOwner: false,
    isPlayer: false,
    attempted: false,
    wantsToContinue: false,
    hasWon: false,
  };
};
