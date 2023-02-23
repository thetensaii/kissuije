import styles from './H3.module.scss';

type Props = {
  variant?: 'regular' | 'medium';
} & React.ButtonHTMLAttributes<HTMLHeadingElement>;

export const H3 = ({ className, variant = 'regular', ...props }: Props): JSX.Element => {
  const classNames = [className, styles.h3, styles[variant]].join(' ');

  return <h2 className={classNames} {...props} />;
};
