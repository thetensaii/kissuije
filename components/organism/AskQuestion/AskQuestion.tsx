import Button from 'components/atom/Button';
import { Svg } from 'components/atom/Svg';
import { H2 } from 'components/atom/Typo/H2';
import { AskQuestionForm } from 'components/molecule/AskQuestionForm';
import { ContentWindow } from 'components/molecule/ContentWindow';
import { useGameRoomContext } from 'providers/GameRoomProvider';
import styles from './AskQuestion.module.scss';

export const AskQuestion = (): JSX.Element => {
  const { askQuestion, redirectToTryGuessScene } = useGameRoomContext();

  return (
    <div className={styles.container}>
      <ContentWindow>
        <div className={styles.choiceContainer}>
          <AskQuestionForm askQuestion={askQuestion} />
          <H2>OU</H2>
          <Button onClick={redirectToTryGuessScene}>
            <div className={styles.guessCharacterButtonContent}>
              <Svg type="User" alt="User Icon" width={39} height={39} />
              <p>Deviner son personnage</p>
            </div>
          </Button>
        </div>
      </ContentWindow>
    </div>
  );
};
