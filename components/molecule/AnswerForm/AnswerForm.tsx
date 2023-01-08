import Button from 'components/atom/Button';
import { AnswerQuestionFn } from 'hooks/useRoom';
import { AnswerType } from 'lib/frontend/types/answer';
import { useState } from 'react';

type Props = {
  questionAsker: string;
  questionText: string;
  answerQuestion: AnswerQuestionFn;
};

export const AnswerForm = ({ questionAsker, questionText, answerQuestion }: Props): JSX.Element => {
  const [answerValue, setAnswerValue] = useState<AnswerType>(AnswerType.yes);

  const handleAnswerForm = (): void => {
    answerQuestion(answerValue);
  };

  return (
    <div>
      <b>{questionAsker}</b> a posé cette question :
      <br />
      <b>{questionText}</b>
      <br />
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
    </div>
  );
};
