import Button from 'components/atom/Button';
import { Input } from 'components/atom/Input';
import { TryGuessFn } from 'hooks/useRoom';
import { isStringEmpty } from 'lib/common/functions';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styles from './TryGuessForm.module.scss';

type Props = {
  tryGuess: TryGuessFn;
};

type AskQuestionFormData = {
  guess: string;
};

export const TryGuessForm = ({ tryGuess }: Props): JSX.Element => {
  const { register, handleSubmit, setFocus } = useForm<AskQuestionFormData>();

  useEffect(() => {
    setFocus('guess');
  }, [setFocus]);

  const handleQuestionForm = ({ guess }: AskQuestionFormData): void => {
    if (isStringEmpty(guess)) {
      alert('Merci de saisir une question');
      return;
    }

    tryGuess(guess);
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit(handleQuestionForm)}>
      <p className={styles.title}>Devine ton personnage</p>
      <p className={styles.text}>Essayez de deviner votre personnage</p>
      <Input {...register('guess')} type="text" required />
      <Button type="submit">Deviner son personnage</Button>
    </form>
  );
};
