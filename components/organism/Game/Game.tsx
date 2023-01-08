import { useGameRoomContext } from 'providers/GameRoomProvider';
import { QuestionForm } from 'components/molecule/QuestionForm';
import { WaitForQuestion } from 'components/molecule/WaitForQuestion';
import { AnswerForm } from 'components/molecule/AnswerForm';
import { WaitForAnswer } from 'components/molecule/WaitForAnswer';
import { AnswersResult } from '../AnswersResult';

export const Game = (): JSX.Element => {
  const {
    players,
    player,
    playingPlayer,
    playingPlayerIsMe,
    question,
    doIAnswered,
    everybodyAnswered,
    askQuestion,
    answerQuestion,
  } = useGameRoomContext();

  if (!player) return <></>;

  return (
    <>
      <h1>C'est PARTI !!!!</h1>
      <ul>
        {players.map((p) => {
          const characterElement: JSX.Element = p.id === player.id ? <i>(moi)</i> : <i>({p.character})</i>;

          return (
            <li key={p.id}>
              {p.name} {characterElement}
            </li>
          );
        })}
      </ul>

      {!everybodyAnswered ? (
        !question ? (
          playingPlayerIsMe ? (
            <QuestionForm askQuestion={askQuestion} />
          ) : (
            <WaitForQuestion waitingFor={playingPlayer.name} />
          )
        ) : !playingPlayerIsMe && !doIAnswered ? (
          <AnswerForm questionAsker={playingPlayer.name} questionText={question.text} answerQuestion={answerQuestion} />
        ) : (
          <WaitForAnswer
            questionAskerIsMe={playingPlayerIsMe}
            questionAsker={playingPlayer.name}
            questionText={question.text}
            numberOfAnswers={question.answers.length}
            maxTotalAnswers={players.length - 1}
          />
        )
      ) : (
        <AnswersResult />
      )}
    </>
  );
};
