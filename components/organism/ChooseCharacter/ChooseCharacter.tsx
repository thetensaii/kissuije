import { ChoosePlayerCharacterForm } from 'components/molecule/ChoosePlayerCharacterForm';
import { ContentWindow } from 'components/molecule/ContentWindow';
import { isStringEmpty } from 'lib/common/functions';
import { useGameRoomContext } from 'providers/GameRoomProvider';

export const ChooseCharacter = (): JSX.Element => {
  const { playerChoosed, validatePlayerCharacter } = useGameRoomContext();

  if (!playerChoosed) throw new Error('No player choosed');

  const validateCharacter = (character: string): void => {
    if (isStringEmpty(character)) {
      alert('Il faut saisir un personnage');
      return;
    }

    validatePlayerCharacter(playerChoosed.id, character);
  };

  return (
    <ContentWindow>
      <ChoosePlayerCharacterForm playerChoosed={playerChoosed} onSubmit={validateCharacter} />
    </ContentWindow>
  );
};
