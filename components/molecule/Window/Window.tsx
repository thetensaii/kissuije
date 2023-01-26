import { Svg } from 'components/atom/Svg';
import { TransparentButton } from 'components/atom/TransparentButton';
import styles from './Window.module.scss';

type Props = {
  onBackButtonClick?: () => void;
  children: React.ReactNode;
};

export const Window = ({ onBackButtonClick, children }: Props): JSX.Element => {
  return (
    <section className={styles.window}>
      <header>
        {onBackButtonClick && (
          <TransparentButton className={styles.backButton} onClick={onBackButtonClick}>
            <Svg type="ChevronLeft" alt="Chevron Gauche" width={20} height={16} /> RETOUR
          </TransparentButton>
        )}
      </header>
      <div className={styles.content}>{children}</div>
    </section>
  );
};
