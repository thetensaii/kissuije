import styles from './Label.module.scss';

type Props = React.LabelHTMLAttributes<HTMLLabelElement>;

export const Label = ({ children, ...props }: Props): JSX.Element => {
  return (
    <label className={styles.label} {...props}>
      {children}
    </label>
  );
};
