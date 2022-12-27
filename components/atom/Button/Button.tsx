import { ReactElement } from 'react'
import styles from './Button.module.scss'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> { }

export default function Button({ children, ...props }: Props): ReactElement {
  return <button className={styles.button} {...props}>
    {children}
  </button>
}