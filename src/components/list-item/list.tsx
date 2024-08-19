import { type ReactNode } from 'react'
import styles from './list.module.css'

interface IListProps {
  children: ReactNode
}

export function List({ children }: IListProps) {
  return <ul className={styles.list}>{children}</ul>
}
