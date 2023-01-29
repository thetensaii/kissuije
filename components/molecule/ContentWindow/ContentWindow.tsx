import Button from 'components/atom/Button';
import styles from './ContentWindow.module.scss';

type Props = {
  onBackButtonClick?: () => void;
  children: React.ReactNode;
};

export const ContentWindow = ({ onBackButtonClick, children }: Props): JSX.Element => {
  return (
    <section>
      <header className={styles.windowHeader}>
        {onBackButtonClick && (
          <Button
            buttonType="transparent"
            className={styles.backButton}
            onClick={onBackButtonClick}
            leftIcon={'ChevronLeft'}
          >
            RETOUR
          </Button>
        )}
      </header>
      <div className={styles.content}>{children}</div>
    </section>
  );
};
