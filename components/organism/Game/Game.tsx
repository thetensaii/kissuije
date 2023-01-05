import { useGameRoomContext } from 'providers/GameRoomProvider';
import { Answer } from '../Answer';
import { AnswersResult } from '../AnswersResult';
import { Question } from '../Question';

export const Game = (): JSX.Element => {
  const { players, player, playingPlayer, everybodyAnswered } = useGameRoomContext();

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

      {!everybodyAnswered ? player.id === playingPlayer.id ? <Question /> : <Answer /> : <AnswersResult />}
    </>
  );
};
