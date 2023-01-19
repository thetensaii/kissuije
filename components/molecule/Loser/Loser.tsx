import { PlayerType } from 'lib/frontend/types/player';

type Props = {
  player: PlayerType;
};

export const Loser = ({ player }: Props): JSX.Element => {
  return (
    <div>
      <h1>Vous avez perdu !</h1>
      <p>Vous étiez : {player.character}</p>
    </div>
  );
};
