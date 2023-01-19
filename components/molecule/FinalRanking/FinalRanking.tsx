import { PlayerType } from 'lib/frontend/types/player';

type Props = {
  players: PlayerType[];
};

export const FinalRanking = ({ players }: Props): JSX.Element => {
  const orderedPlayers = [...players].sort((a, b) => (a.hasWon === b.hasWon ? 0 : a.hasWon ? -1 : 1));

  return (
    <div>
      <h2>Classement</h2>
      <br />
      <div>
        <ul>
          {orderedPlayers.map((p) => {
            if (p.hasWon)
              return (
                <li key={p.id}>
                  1. <b>{p.name}</b> a déviné <b>{p.character}</b>
                </li>
              );
            return (
              <li key={p.id}>
                2. <b>{p.name}</b> n'a pas déviné <b>{p.character}</b>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
