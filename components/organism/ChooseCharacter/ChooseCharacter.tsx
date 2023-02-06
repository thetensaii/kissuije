import { ChoosePlayerCharacterForm } from 'components/molecule/ChoosePlayerCharacterForm';
import { Card } from 'components/molecule/Card';
import { isStringEmpty } from 'lib/common/functions';
import { useGameRoomAPIContext, useGameRoomDataContext } from 'providers/GameRoomProvider';

import styles from './ChooseCharacter.module.scss';

export const ChooseCharacter = (): JSX.Element => {
  const { roomId, choosedPlayer } = useGameRoomDataContext();
  const { validatePlayerCharacter } = useGameRoomAPIContext();

  if (!roomId) throw new Error('No Room');
  if (!choosedPlayer) throw new Error('No player choosed');

  const validateCharacter = (character: string): void => {
    if (isStringEmpty(character)) {
      alert('Il faut saisir un personnage');
      return;
    }

    validatePlayerCharacter(roomId, choosedPlayer.id, character);
  };

  return (
    <div className={styles.container}>
      <Card>
        <div className={styles.formContainer}>
          <ChoosePlayerCharacterForm playerChoosed={choosedPlayer} onSubmit={validateCharacter} />
        </div>
      </Card>
    </div>
  );
};
