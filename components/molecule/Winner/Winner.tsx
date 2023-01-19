import { PlayerType } from 'lib/frontend/types/player';

type Props = {
  player: PlayerType;
};

export const Winner = ({ player }: Props): JSX.Element => {
  return (
    <div>
      <h1>Vous avez gagné !</h1>
      <div>Vous étiez bien : {player.character}</div>
    </div>
  );
};
