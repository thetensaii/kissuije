import styles from './Typo.module.scss';

type Props = {
  tag: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  children: React.ReactNode;
  className?: string;
} & (
  | {
      variant: 'mainHeading1';
      font?: undefined;
    }
  | {
      variant: 'heading1';
      font?: undefined;
    }
  | {
      variant: 'heading2';
      font: 'medium' | 'semiBold';
    }
  | {
      variant: 'heading3';
      font: 'regular' | 'medium';
    }
  | {
      variant: 'question';
      font?: undefined;
    }
  | {
      variant: 'body';
      font?: undefined;
    }
  | {
      variant: 'button';
      font?: undefined;
    }
);

export const Typo = ({ tag, variant, className, font, children }: Props): JSX.Element => {
  const Component = tag;

  const variantClassName = styles[variant];
  const fontClassName = font ? styles[font] : undefined;

  const classNames = [variantClassName, fontClassName, className].filter(Boolean).join(' ');

  return <Component className={classNames}>{children}</Component>;
};
