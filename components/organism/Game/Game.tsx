import Button from 'components/atom/Button';
import { isStringEmpty } from 'lib/common/functions';
import { Answer } from 'lib/frontend/question';
import { useGameRoomContext } from 'providers/GameRoomProvider';
import { useRef, useState } from 'react';

export const Game = (): JSX.Element => {
  const { players, player, playingPlayer, question, doIAnswered, askQuestion, answerQuestion } = useGameRoomContext();

  const questionInputRef = useRef<HTMLInputElement>(null);
  const [answerValue, setAnswerValue] = useState<Answer>('yes');

  if (!player) return <></>;

  const handleQuestionForm = (): void => {
    const question = questionInputRef.current?.value;
    if (!question || isStringEmpty(question)) {
      alert('Merci de saisir une question');
      return;
    }

    askQuestion(question);
  };

  const handleAnswerForm = (): void => {
    answerQuestion(answerValue);
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
              <b>{question.text}</b>
              <br />
              <div>
                Réponses : {question.answers.length} / {players.length - 1}
              </div>
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
              <b>{question.text}</b>
              <br />
              {!doIAnswered && (
                <>
                  <div>
                    <input
                      type="radio"
                      name="answer"
                      id="yes"
                      checked={answerValue === Answer.yes}
                      value={Answer.yes}
                      onChange={(): void => setAnswerValue(Answer.yes)}
                    />
                    <label htmlFor="yes">Oui</label>
                    <br />
                    <input
                      type="radio"
                      name="answer"
                      id="no"
                      checked={answerValue === Answer.no}
                      value={Answer.no}
                      onChange={(): void => setAnswerValue(Answer.no)}
                    />
                    <label htmlFor="no">Non</label>
                    <br />
                    <input
                      type="radio"
                      name="answer"
                      id="idk"
                      checked={answerValue === Answer.idk}
                      value={Answer.idk}
                      onChange={(): void => setAnswerValue(Answer.idk)}
                    />
                    <label htmlFor="idk">Je ne sais pas</label>
                    <br />

                    <Button onClick={handleAnswerForm}>Envoyez la réponse</Button>
                  </div>
                  <br />
                </>
              )}
              <div>
                Réponses : {question.answers.length} / {players.length - 1}
              </div>
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
