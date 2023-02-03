import { H1 } from 'components/atom/Typo/H1';
import { RuleExplanation } from '../RuleExplanation';
import styles from './RulesExplanation.module.scss';

export const RulesExplanation = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <H1>Comment jouer ?</H1>
      <div className={styles.rulesExplanation}>
        <RuleExplanation number={1}>
          <p>Chaque joueur choisis un personnage pour un autre joueur</p>
        </RuleExplanation>
        <RuleExplanation number={2}>
          <p>A ton tour, tu pourras poser des questions pour deviner ton personnage</p>
        </RuleExplanation>
        <RuleExplanation number={3}>
          <p>Tu répondras ensuite aux questions des autres joueurs concernant leur personnage</p>
        </RuleExplanation>
        <RuleExplanation number={4}>
          <p>Le premier qui trouve à gagner !</p>
        </RuleExplanation>
      </div>
    </div>
  );
};
