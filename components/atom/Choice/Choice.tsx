import { Typo } from '../Typo';
import styles from './Choice.module.scss';

export type InputButtonType = 'yes' | 'no' | 'idk' | 'true' | 'false';

type Props = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> & {
  type: InputButtonType;
};

const valueStyleMap: Record<InputButtonType, typeof styles[keyof typeof styles]> = {
  true: styles.true,
  false: styles.false,
  yes: styles.yes,
  no: styles.no,
  idk: styles.idk,
};

export const Choice = ({ type, children, ...props }: Props): JSX.Element => {
  return (
    <button type="button" className={`${styles.choice} ${valueStyleMap[type]}`} {...props}>
      <Typo tag="span" variant="button">
        {children}
      </Typo>
    </button>
  );
};
