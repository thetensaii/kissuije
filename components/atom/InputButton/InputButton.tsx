import Button from '../Button';
import { ButtonTypo } from '../Typo/ButtonTypo';
import styles from './InputButton.module.scss';

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

export const InputButton = ({ type, children, ...props }: Props): JSX.Element => {
  return (
    <Button type="button" className={`${styles.inputButton} ${valueStyleMap[type]}`} {...props}>
      <ButtonTypo>{children}</ButtonTypo>
    </Button>
  );
};
