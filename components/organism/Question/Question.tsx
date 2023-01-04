import Button from 'components/atom/Button';
import { isStringEmpty } from 'lib/common/functions';
import { useGameRoomContext } from 'providers/GameRoomProvider';
import { useRef } from 'react';

export const Question = (): JSX.Element => {
  const { players, question, askQuestion } = useGameRoomContext();

  const questionInputRef = useRef<HTMLInputElement>(null);

  const handleQuestionForm = (): void => {
    const question = questionInputRef.current?.value;
    if (!question || isStringEmpty(question)) {
      alert('Merci de saisir une question');
      return;
    }

    askQuestion(question);
  };

  if (!question) {
    return (
      <div>
        <input type="text" ref={questionInputRef} />
        <Button onClick={handleQuestionForm}>Envoyez la question</Button>
      </div>
    );
  }

  return (
    <div>
      Vous avez posé la question suivante:
      <br />
      <b>{question.text}</b>
      <br />
      <div>
        Réponses : {question.answers.length} / {players.length - 1}
      </div>
    </div>
  );
};
