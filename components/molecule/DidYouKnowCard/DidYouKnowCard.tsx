import { H2 } from 'components/atom/Typo/H2';
import styles from './DidYouKnowCard.module.scss';

type Props = {
  text: string;
};

export const DidYouKnowCard = ({ text }: Props): JSX.Element => {
  return (
    <div className={styles.container}>
      <H2 className={styles.title}>
        <b>Le saviez vous ?</b>
      </H2>
      <p>{text}</p>
    </div>
  );
};
