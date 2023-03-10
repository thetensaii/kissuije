import { useMemo } from 'react';
import Button from 'components/atom/Button';
import { useGameRoomAPIContext, useGameRoomDataContext } from 'providers/GameRoomProvider';
import { Card } from 'components/molecule/Card';
import { LobbyPlayersList } from 'components/molecule/LobbyPlayersList';
import { LobbyInvitation } from 'components/molecule/LobbyInvitation';
import styles from './Lobby.module.scss';

export const Lobby = (): JSX.Element => {
  const { player, roomId, players } = useGameRoomDataContext();
  const { startGame } = useGameRoomAPIContext();

  if (!roomId) throw new Error('No Room');
  if (!player) throw new Error('No Player');

  const roomLink = useMemo(() => process.env.NEXT_PUBLIC_HOST + '/' + roomId, [roomId]);

  const redirectHome = (): void => {
    window.location.href = process.env.NEXT_PUBLIC_HOST ?? '';
  };

  return (
    <div className={styles.container}>
      <Card onBackButtonClick={redirectHome}>
        <div className={styles.windowContent}>
          <div className={styles.lobbyInfoContainer}>
            <LobbyPlayersList players={players} />
            <LobbyInvitation invitationLink={roomLink} />
          </div>
          {player.isOwner && players.length > 1 && (
            <Button rightIcon="ArrowRight" onClick={(): void => startGame(roomId)} className={styles.startGameButton}>
              Démarrer la partie
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};
