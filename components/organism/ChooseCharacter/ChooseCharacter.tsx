import Button from 'components/atom/Button';
import { isStringEmpty } from 'lib/common/functions';
import { useGameRoomContext } from 'providers/RoomSocketProvider';
import { useRef } from 'react';

export const ChooseCharacter = (): JSX.Element => {
  const { selectedPlayer, validatePlayerCharacter } = useGameRoomContext();

  const characterInputRef = useRef<HTMLInputElement>(null);

  if (!selectedPlayer) return <></>;

  const validateCharacter = (): void => {
    if (!characterInputRef.current?.value || isStringEmpty(characterInputRef.current.value)) {
      alert('Il faut saisir un personnage');
      return;
    }

    const character = characterInputRef.current.value;
    validatePlayerCharacter(selectedPlayer.id, character);
  };

  return (
    <>
      <h3>Choisissez le personnage de : {selectedPlayer.name} </h3>

      <input type="text" placeholder="Entrez un personnage" ref={characterInputRef} />

      <Button onClick={validateCharacter}>Valider le personnage</Button>
    </>
  );
};
