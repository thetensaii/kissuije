type Props = {
  waitingFor: string;
};

export const WaitForQuestion = ({ waitingFor }: Props): JSX.Element => {
  return (
    <div>
      C'est au tour de <b>{waitingFor}</b> de jouer..
    </div>
  );
};
