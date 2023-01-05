import { AnswerType } from 'lib/frontend/types/answer';
import { useGameRoomContext } from 'providers/GameRoomProvider';

export const AnswersResult = (): JSX.Element => {
  const { question, everybodyAnswered } = useGameRoomContext();

  if (!everybodyAnswered) return <></>;

  if (!question) return <></>;

  const yesAnswersNumber = question.answers.filter((a) => a === AnswerType.yes).length;
  const noAnswersNumber = question.answers.filter((a) => a === AnswerType.no).length;
  const idkAnswersNumber = question.answers.filter((a) => a === AnswerType.idk).length;

  return (
    <div>
      <div>
        La question :{' '}
        <span>
          <b>{question.text}</b>
        </span>
      </div>

      <h4>Réponses : </h4>
      <ul>
        <li>Oui : {yesAnswersNumber}</li>
        <li>Non : {noAnswersNumber}</li>
        <li>Je ne sais pas : {idkAnswersNumber}</li>
      </ul>
    </div>
  );
};
