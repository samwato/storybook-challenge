import styles from './search-field.module.css'
import { InputHTMLAttributes } from 'react'

type ISearchFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>

export function SearchField(props: ISearchFieldProps) {
  return (
    <input
      className={styles.input}
      placeholder="Search"
      type="search"
      {...props}
    />
  )
}
