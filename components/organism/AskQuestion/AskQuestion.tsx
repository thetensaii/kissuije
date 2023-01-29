import { AskQuestionForm } from 'components/molecule/AskQuestionForm';
import { ContentWindow } from 'components/molecule/ContentWindow';
import { useGameRoomContext } from 'providers/GameRoomProvider';

export const AskQuestion = (): JSX.Element => {
  const { askQuestion } = useGameRoomContext();

  return (
    <ContentWindow>
      <AskQuestionForm askQuestion={askQuestion} />
    </ContentWindow>
  );
};
