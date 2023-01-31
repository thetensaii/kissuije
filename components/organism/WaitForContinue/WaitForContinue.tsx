import { WaitForContinueCard } from 'components/molecule/WaitForContinueCard';
import styles from './WaitForContinue.module.scss';

export const WaitForContinue = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <WaitForContinueCard />
    </div>
  );
};
