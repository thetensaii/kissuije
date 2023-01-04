import Button from 'components/atom/Button';
import { isStringEmpty } from 'lib/common/functions';
import { useGameRoomContext } from 'providers/GameRoomProvider';
import { useRef } from 'react';

export const Game = (): JSX.Element => {
  const { players, player, playingPlayer, question, askQuestion } = useGameRoomContext();

  const questionInputRef = useRef<HTMLInputElement>(null);

  if (!player) return <></>;
  if (!player) return <></>;

  const handleQuestionForm = (): void => {
    const question = questionInputRef.current?.value;
    if (!question || isStringEmpty(question)) {
      alert('Merci de saisir une question');
      return;
    }

    askQuestion(question);
  };

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
          {question ? (
            <div>
              Vous avez posé la question suivante :
              <br />
              <b>{question}</b>
            </div>
          ) : (
            <div>
              <input type="text" ref={questionInputRef} />
              <Button onClick={handleQuestionForm}>Envoyez la question</Button>
            </div>
          )}
        </>
      ) : (
        <>
          {question ? (
            <div>
              <b>{playingPlayer.name}</b> a posé cette question :
              <br />
              <b>{question}</b>
            </div>
          ) : (
            <div>
              C'est au tour de <b>{playingPlayer.name}</b> de jouer..
            </div>
          )}
        </>
      )}
    </>
  );
};
