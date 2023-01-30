import { getStatInPercent, AnswerResultStats } from 'lib/frontend/functions/ResultStats';
import styles from './ResultStatBar.module.scss';

type Props = {
  stats: AnswerResultStats;
  countTotalAnswers: number;
};

export const ResultStatBar = ({ stats, countTotalAnswers }: Props): JSX.Element => {
  const countYesPercent = getStatInPercent(stats.yes, countTotalAnswers);
  const countNoPercent = getStatInPercent(stats.no, countTotalAnswers);
  const countIdkPercent = getStatInPercent(stats.idk, countTotalAnswers);

  return (
    <div className={styles.container}>
      {countYesPercent > 0 && (
        <div className={`${styles.yes} ${styles['grow-' + countYesPercent]}`}>Oui ({countYesPercent}%)</div>
      )}
      {countNoPercent > 0 && (
        <div className={`${styles.no} ${styles['grow-' + countNoPercent]}`}>Non ({countNoPercent}%)</div>
      )}
      {countIdkPercent > 0 && (
        <div className={`${styles.idk} ${styles['grow-' + countIdkPercent]}`}>Je ne sais pas ({countIdkPercent}%)</div>
      )}
    </div>
  );
};
