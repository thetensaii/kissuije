import Button from 'components/atom/Button';
import { Input } from 'components/atom/Input';
import { isStringEmpty } from 'lib/common/functions';
import { useGameRoomContext } from 'providers/GameRoomProvider';
import { useRef } from 'react';

export const ChooseCharacter = (): JSX.Element => {
  const { playerChoosed, validatePlayerCharacter } = useGameRoomContext();

  const characterInputRef = useRef<HTMLInputElement>(null);

  if (!playerChoosed) return <></>;

  const validateCharacter = (): void => {
    if (!characterInputRef.current?.value || isStringEmpty(characterInputRef.current.value)) {
      alert('Il faut saisir un personnage');
      return;
    }

    const character = characterInputRef.current.value;
    validatePlayerCharacter(playerChoosed.id, character);
  };

  return (
    <>
      <h3>Choisissez le personnage de : {playerChoosed.name} </h3>

      <Input type="text" placeholder="Entrez un personnage" ref={characterInputRef} />

      <Button onClick={validateCharacter}>Valider le personnage</Button>
    </>
  );
};
