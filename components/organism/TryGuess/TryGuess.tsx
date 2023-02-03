import { ContentWindow } from 'components/molecule/ContentWindow';
import { TryGuessForm } from 'components/molecule/TryGuessForm';
import { useGameRoomContext } from 'providers/GameRoomProvider';

import styles from './TryGuess.module.scss';

export const TryGuess = (): JSX.Element => {
  const { tryGuess, redirectToAskQuestionScene } = useGameRoomContext();

  return (
    <div className={styles.container}>
      <ContentWindow onBackButtonClick={redirectToAskQuestionScene}>
        <div className={styles.formContainer}>
          <TryGuessForm tryGuess={tryGuess} />
        </div>
      </ContentWindow>
    </div>
  );
};
