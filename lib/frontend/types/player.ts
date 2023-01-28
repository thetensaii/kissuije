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
