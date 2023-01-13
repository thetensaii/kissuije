import { PlayerType } from 'lib/frontend/types/player';

type Props = {
  player: PlayerType;
  players: PlayerType[];
};

export const PlayersList = ({ player, players }: Props): JSX.Element => {
  return (
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
  );
};
