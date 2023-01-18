type Props = {
  character: string;
};

export const WinResult = ({ character }: Props): JSX.Element => {
  return (
    <div>
      <h1>Vous avez gagné</h1>
      <h2>Vous étiez : {character}</h2>
    </div>
  );
};
