import { ReactElement } from 'react'
import styles from './Button.module.scss'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>

export default function Button({ children, ...props }: Props): ReactElement {
  return <button className={styles.button} {...props}>
    {children}
  </button>
}