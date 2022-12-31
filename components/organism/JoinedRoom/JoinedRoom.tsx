import Button from 'components/atom/Button';
import { useGameRoomContext } from 'providers/GameRoomProvider';
import { useCallback } from 'react';

export const JoinedRoom = (): JSX.Element => {
  const { player, joinedRoom, ownerId, players, startGame } = useGameRoomContext();

  const copyRoomLink = useCallback(() => {
    navigator.clipboard.writeText(process.env.NEXT_PUBLIC_HOST + '/' + joinedRoom);
  }, [joinedRoom]);

  if (!joinedRoom) return <></>;

  if (!player) return <></>;

  return (
    <>
      <h1>{joinedRoom}</h1>

      {player.id === ownerId && players.length > 1 && (
        <Button onClick={(): void => startGame(joinedRoom)}>Lancer la partie</Button>
      )}

      <h3>Liste des participants</h3>
      <ul>
        <li>{player.name} (moi)</li>
        {players
          .filter((p) => p.id !== player.id)
          .map((player) => (
            <li key={player.id}>{player.name}</li>
          ))}
      </ul>

      <Button onClick={copyRoomLink}>Copier le lien d'invitation</Button>

      <a href="/">
        <Button>Retour à l'accueil</Button>
      </a>
    </>
  );
};
