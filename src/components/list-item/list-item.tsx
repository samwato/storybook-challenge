import { useCallback } from 'react'
import styles from './list-item.module.css'
import { cls } from '../../utils/styles.ts'

interface IListItemProps {
  avatarSrc: string
  selected?: boolean
  heading: string
  id: string
  onClick?: (id: string) => void
  showSubHeading?: boolean
  subHeading: string
}

/**
 * Generic list item component that can be used for any type of data item.
 * Must have a unique id field.
 */
export function ListItem({
  avatarSrc,
  selected = false,
  heading,
  id,
  onClick,
  showSubHeading = false,
  subHeading,
}: IListItemProps) {
  const handleClick = useCallback(() => {
    onClick?.(id)
  }, [id, onClick])

  return (
    <li
      className={styles.list_item}
      data-selected={selected}
      onClick={handleClick}
    >
      <img className={styles.avatar} src={avatarSrc} alt="Avatar" />
      <div className={styles.content}>
        <span
          className={
            selected && !showSubHeading
              ? cls(styles.heading, styles.heading_highlight)
              : styles.heading
          }
        >
          {heading}
        </span>
        {showSubHeading && (
          <span className={styles.sub_heading}>{subHeading}</span>
        )}
      </div>
    </li>
  )
}
