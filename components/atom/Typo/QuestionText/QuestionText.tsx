import styles from './QuestionText.module.scss';

type Props = React.ButtonHTMLAttributes<HTMLHeadingElement>;

export const QuestionText = ({ className, ...props }: Props): JSX.Element => {
  return <h2 className={`${className} ${styles.questionText}`} {...props} />;
};
