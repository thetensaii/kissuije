import styles from './InputButton.module.scss';

export type InputButtonValue = 'Oui' | 'Non' | 'Je ne sais pas' | 'Vrai' | 'Faux';

type Props = Omit<
  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'type' | 'value'
> & {
  value: InputButtonValue;
};

const valueStyleMap: Record<InputButtonValue, typeof styles[keyof typeof styles]> = {
  Vrai: styles.vrai,
  Faux: styles.faux,
  Oui: styles.oui,
  Non: styles.non,
  'Je ne sais pas': styles.jnsp,
};

export const InputButton = ({ value, ...props }: Props): JSX.Element => {
  return <input type="button" className={`${styles.inputButton} ${valueStyleMap[value]}`} value={value} {...props} />;
};
