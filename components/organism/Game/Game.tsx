import Button from 'components/atom/Button';
import { useGameRoomContext } from 'providers/GameRoomProvider';

export const Game = (): JSX.Element => {
  const { players, player, playingPlayer } = useGameRoomContext();

  if (!player) return <></>;
  if (!player) return <></>;

  return (
    <>
      <h1>C'est PARTI !!!!</h1>
      <ul>
        {players.map((p) => {
          const characterElement: JSX.Element = p.id === player.id ? <i>(moi)</i> : <i>({p.character})</i>;

          return (
            <li key={p.id}>
              {p.name} {characterElement}
            </li>
          );
        })}
      </ul>

      {player.id === playingPlayer.id ? (
        <>
          <div>
            <input type="text" />
            <Button>Envoyez la question</Button>
          </div>
        </>
      ) : (
        <>
          <div>
            C'est au tour de <b>{playingPlayer.name}</b> de jouer..
          </div>
        </>
      )}
    </>
  );
};
