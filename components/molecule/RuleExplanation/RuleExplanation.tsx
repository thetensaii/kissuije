import { BulletPoint } from 'components/atom/BulletPoint';
import styles from './RuleExplanation.module.scss';

type Props = {
  number: number;
  children: React.ReactNode;
};

export const RuleExplanation = ({ number, children }: Props): JSX.Element => {
  return (
    <div className={styles.ruleExplanation}>
      <BulletPoint number={number} />
      {children}
    </div>
  );
};
