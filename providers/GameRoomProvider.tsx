import { useRoom, UseRoomReturnType } from 'hooks/useRoom';
import { createContext, useContext } from 'react';
type GameRoomContextType = UseRoomReturnType;

const GameRoomContext = createContext<GameRoomContextType | null>(null);

export const useGameRoomContext = (): GameRoomContextType => {
  const gameRoomContext = useContext(GameRoomContext);

  if (gameRoomContext === null) throw new Error('useRoom must be within GameRoomProvider');

  return gameRoomContext;
};

interface Props {
  children: React.ReactNode;
}

export function GameRoomProvider({ children }: Props): JSX.Element {
  const value = useRoom();

  return <GameRoomContext.Provider value={value}>{children}</GameRoomContext.Provider>;
}
