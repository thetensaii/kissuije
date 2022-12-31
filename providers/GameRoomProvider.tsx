import { useRoom, UseRoomReturnType } from 'hooks/useRoom';
import { createContext, useContext } from 'react';
type GameRoomContextType = UseRoomReturnType;

const GameRoomContext = createContext<GameRoomContextType | null>(null);

export const useGameRoomContext = (): GameRoomContextType => {
  const socketContext = useContext(GameRoomContext);

  if (socketContext === null) throw new Error('useRoomSocket must be within RoomSocketProvider');

  return socketContext;
};

interface Props {
  children: React.ReactNode;
}

export function GameRoomProvider({ children }: Props): JSX.Element {
  const value = useRoom();

  return <GameRoomContext.Provider value={value}>{children}</GameRoomContext.Provider>;
}
