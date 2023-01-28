import Button from 'components/atom/Button';
import { Svg } from 'components/atom/Svg';
import styles from './ContentWindow.module.scss';

type Props = {
  onBackButtonClick?: () => void;
  children: React.ReactNode;
};

export const ContentWindow = ({ onBackButtonClick, children }: Props): JSX.Element => {
  return (
    <section className={styles.window}>
      <header>
        {onBackButtonClick && (
          <Button buttonType="transparent" className={styles.backButton} onClick={onBackButtonClick}>
            <Svg type="ChevronLeft" alt="Chevron Gauche" width={20} height={16} /> RETOUR
          </Button>
        )}
      </header>
      <div className={styles.content}>{children}</div>
    </section>
  );
};
