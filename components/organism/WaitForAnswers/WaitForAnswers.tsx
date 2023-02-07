import { WaitForAnswersCard } from 'components/molecule/WaitForAnswersCard';

import styles from './WaitForAnswers.module.scss';

export const WaitForAnswers = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <WaitForAnswersCard />
    </div>
  );
};
