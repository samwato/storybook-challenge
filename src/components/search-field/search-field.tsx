import type { InputHTMLAttributes } from 'react'
import styles from './search-field.module.css'

type ISearchFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>

/**
 * A basic search field component.
 * Use as a controlled component.
 */
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
