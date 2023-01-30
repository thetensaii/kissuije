import Button from 'components/atom/Button';
import { InputText } from 'components/atom/InputText';
import { AskQuestionFn } from 'hooks/useRoom';
import { isStringEmpty } from 'lib/common/functions';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styles from './AskQuestionForm.module.scss';

type Props = {
  askQuestion: AskQuestionFn;
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
      <p className={styles.title}>Posez une question</p>
      <p className={styles.text}>
        Ecrivez une question et les participants répondront par oui, non ou “je ne sais pas”.
      </p>
      <InputText {...register('question')} type="text" required />
      <Button type="submit">Poser la question</Button>
    </form>
  );
};
