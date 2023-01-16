import Button from 'components/atom/Button';
import { Input } from 'components/atom/Input';
import { AskQuestionFn } from 'hooks/useRoom';
import { isStringEmpty } from 'lib/common/functions';
import { useRef } from 'react';

type Props = {
  askQuestion: AskQuestionFn;
};

export const QuestionForm = ({ askQuestion }: Props): JSX.Element => {
  const questionInputRef = useRef<HTMLInputElement>(null);

  const handleQuestionForm = (): void => {
    const question = questionInputRef.current?.value;
    if (!question || isStringEmpty(question)) {
      alert('Merci de saisir une question');
      return;
    }

    askQuestion(question);
  };

  return (
    <div>
      <Input type="text" ref={questionInputRef} />
      <Button onClick={handleQuestionForm}>Envoyez la question</Button>
    </div>
  );
};
