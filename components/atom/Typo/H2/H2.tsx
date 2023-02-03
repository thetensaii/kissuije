import styles from './H2.module.scss';

type Props = React.ButtonHTMLAttributes<HTMLHeadingElement>;

export const H2 = ({ className, ...props }: Props): JSX.Element => {
  return <h2 className={`${className} ${styles.h2}`} {...props} />;
};
