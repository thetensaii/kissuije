import Button from 'components/atom/Button';
import { InputText } from 'components/atom/InputText';
import { TryGuessFn } from 'hooks/useRoom';
import { isStringEmpty } from 'lib/common/functions';
import { useRef } from 'react';

type Props = {
  tryGuess: TryGuessFn;
};

export const GuessForm = ({ tryGuess }: Props): JSX.Element => {
  const guessInputRef = useRef<HTMLInputElement>(null);

  const handleGuessForm = (): void => {
    const text = guessInputRef.current?.value;
    if (!text || isStringEmpty(text)) {
      alert('Merci de saisir un personnage');
      return;
    }

    tryGuess(text);
  };

  return (
    <div>
      <InputText type="text" ref={guessInputRef} />
      <Button onClick={handleGuessForm}>Deviner son personnage</Button>
    </div>
  );
};
