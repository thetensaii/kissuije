import { SocketPlayerType } from 'lib/common/socketsTypes';

export type PlayerType = {
  id: string;
  name: string;
  character: string;
  attempted: boolean;
  wantsToContinue: boolean;
};

export const convertSocketPlayerToFrontendPlayer = (socketPlayer: SocketPlayerType): PlayerType => {
  return {
    ...socketPlayer,
    attempted: false,
    wantsToContinue: false,
  };
};
