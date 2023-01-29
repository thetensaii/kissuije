import { ContentWindow } from 'components/molecule/ContentWindow';
import { TryGuessForm } from 'components/molecule/TryGuessForm';
import { useGameRoomContext } from 'providers/GameRoomProvider';

export const TryGuess = (): JSX.Element => {
  const { tryGuess, redirectToAskQuestionScene } = useGameRoomContext();

  return (
    <ContentWindow onBackButtonClick={redirectToAskQuestionScene}>
      <TryGuessForm tryGuess={tryGuess} />
    </ContentWindow>
  );
};
