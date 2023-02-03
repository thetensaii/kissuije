import { SocketPlayerType } from 'lib/common/socketsTypes';
import { avatarList, AvatarType } from './svg';

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

const isAvatar = (avatar: string): avatar is AvatarType => avatarList.includes(avatar as AvatarType);

const convertSocketAvatarToFrontendAvatar = (socketAvatar: SocketPlayerType['avatar']): AvatarType => {
  if (isAvatar(socketAvatar)) return socketAvatar;

  return AvatarType.AvatarHello;
};

export const convertSocketPlayerToFrontendPlayer = (
  socketPlayer: SocketPlayerType,
  isOwner = false,
  isPlayer = false
): PlayerType => {
  return {
    ...socketPlayer,
    avatar: convertSocketAvatarToFrontendAvatar(socketPlayer.avatar),
    isOwner: isOwner,
    isPlayer: isPlayer,
    attempted: false,
    wantsToContinue: false,
    hasWon: false,
  };
};
