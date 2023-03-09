import Button from 'components/atom/Button';
import { InputText } from 'components/atom/InputText';
import { Typo } from 'components/atom/Typo';
import { isStringEmpty } from 'lib/common/functions';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styles from './AskQuestionForm.module.scss';

type Props = {
  askQuestion: (text: string) => void;
};

type AskQuestionFormData = {
  question: string;
};

export const AskQuestionForm = ({ askQuestion }: Props): JSX.Element => {
  const { register, handleSubmit, setFocus } = useForm<AskQuestionFormData>();

  useEffect(() => {
    setFocus('question');
  }, [setFocus]);

  const handleQuestionForm = ({ question }: AskQuestionFormData): void => {
    if (isStringEmpty(question)) {
      alert('Merci de saisir une question');
      return;
    }

    askQuestion(question);
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit(handleQuestionForm)}>
      <Typo tag="h1" variant="heading1">
        Posez une question
      </Typo>
      <p>Ecrivez une question et les participants répondront par oui, non ou “je ne sais pas”.</p>
      <InputText {...register('question')} type="text" placeholder="Saisir votre question" required />
      <Button type="submit">Poser la question</Button>
    </form>
  );
};
