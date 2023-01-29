import styles from './DidYouKnowCard.module.scss';

type Props = {
  text: string;
};

export const DidYouKnowCard = ({ text }: Props): JSX.Element => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Le saviez vous ?</h3>
      <p className={styles.text}>{text}</p>
    </div>
  );
};
