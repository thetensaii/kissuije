import { Svg } from 'components/atom/Svg';
import { ContentWindow } from 'components/molecule/ContentWindow';
import { DidYouKnowCard } from 'components/molecule/DidYouKnowCard';
import styles from './WaitForAttempts.module.scss';

export const WaitForAttempts = (): JSX.Element => {
  return (
    <ContentWindow>
      <div className={styles.container}>
        <Svg type="Checked" alt="Checked" width={72} height={72} />
        <p className={styles.waitingText}>En attente des autres joueurs...</p>
        <DidYouKnowCard text="Willard Smith, alias Will Smith (prononcé en anglais : /wɪl smɪθ/), est un acteur, chanteur, scénariste et producteur de cinéma américain" />
      </div>
    </ContentWindow>
  );
};
