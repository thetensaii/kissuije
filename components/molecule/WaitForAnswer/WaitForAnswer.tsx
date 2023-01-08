type Props = {
  questionAskerIsMe: boolean;
  questionAsker: string;
  questionText: string;
  numberOfAnswers: number;
  maxTotalAnswers: number;
};

export const WaitForAnswer = ({
  questionAskerIsMe,
  questionAsker,
  questionText,
  numberOfAnswers,
  maxTotalAnswers,
}: Props): JSX.Element => {
  return (
    <div>
      {questionAskerIsMe ? (
        <>Vous avez posé la question suivante:</>
      ) : (
        <>
          <b>{questionAsker}</b> a posé cette question :
        </>
      )}
      <br />
      <b>{questionText}</b>
      <br />
      <div>
        Réponses : {numberOfAnswers} / {maxTotalAnswers}
      </div>
    </div>
  );
};
