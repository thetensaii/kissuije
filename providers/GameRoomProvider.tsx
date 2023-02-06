import { useRoom, UseRoomReturnType } from 'hooks/useRoom';
import { createContext, useContext, useMemo } from 'react';
type GameRoomDataContextType = UseRoomReturnType['state'];
const GameRoomDataContext = createContext<GameRoomDataContextType | null>(null);
export const useGameRoomDataContext = (): GameRoomDataContextType => {
  const gameRoomDataContext = useContext(GameRoomDataContext);

  if (gameRoomDataContext === null) throw new Error('useGameRoomDataContext must be within GameRoomDataProvider');

  return gameRoomDataContext;
};

type GameRoomAPIContextType = UseRoomReturnType['api'];
const GameRoomAPIContext = createContext<GameRoomAPIContextType | null>(null);
export const useGameRoomAPIContext = (): GameRoomAPIContextType => {
  const gameRoomAPIContext = useContext(GameRoomAPIContext);

  if (gameRoomAPIContext === null) throw new Error('useGameRoomAPIContext must be within GameRoomAPIProvider');

  return gameRoomAPIContext;
};

interface Props {
  children: React.ReactNode;
}

export function GameRoomProvider({ children }: Props): JSX.Element {
  const { state, api } = useRoom();

  const apiValue = useMemo(() => api, [api]);
  const stateValue = useMemo(() => state, [state]);

  return (
    <GameRoomAPIContext.Provider value={apiValue}>
      <GameRoomDataContext.Provider value={stateValue}>{children}</GameRoomDataContext.Provider>;
    </GameRoomAPIContext.Provider>
  );
}
