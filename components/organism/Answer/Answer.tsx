import Button from 'components/atom/Button';
import { AnswerType } from 'lib/frontend/types/answer';
import { useGameRoomContext } from 'providers/GameRoomProvider';
import { useState } from 'react';

export const Answer = (): JSX.Element => {
  const { players, playingPlayer, question, doIAnswered, answerQuestion } = useGameRoomContext();

  const [answerValue, setAnswerValue] = useState<AnswerType>(AnswerType.yes);

  if (!question) {
    return (
      <div>
        C'est au tour de <b>{playingPlayer.name}</b> de jouer..
      </div>
    );
  }

  const handleAnswerForm = (): void => {
    answerQuestion(answerValue);
  };

  return (
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
              checked={answerValue === AnswerType.yes}
              value={AnswerType.yes}
              onChange={(): void => setAnswerValue(AnswerType.yes)}
            />
            <label htmlFor="yes">Oui</label>
            <br />
            <input
              type="radio"
              name="answer"
              id="no"
              checked={answerValue === AnswerType.no}
              value={AnswerType.no}
              onChange={(): void => setAnswerValue(AnswerType.no)}
            />
            <label htmlFor="no">Non</label>
            <br />
            <input
              type="radio"
              name="answer"
              id="idk"
              checked={answerValue === AnswerType.idk}
              value={AnswerType.idk}
              onChange={(): void => setAnswerValue(AnswerType.idk)}
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
  );
};
