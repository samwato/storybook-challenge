import { type KeyboardEventHandler, useCallback } from 'react'
import styles from './list.module.css'
import { cls } from '../../utils/styles.ts'

export interface IListItemProps {
  avatarSrc: string
  selected?: boolean
  heading: string
  id: string
  onSelect?: (id: string) => void
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
  onSelect,
  showSubHeading = false,
  subHeading,
}: IListItemProps) {
  const handleClick = useCallback(() => {
    onSelect?.(id)
  }, [id, onSelect])

  const handleKeyDown = useCallback<KeyboardEventHandler<HTMLElement>>(
    (event) => {
      if (event.key === ' ' || event.key === 'Enter') {
        event.preventDefault()
        onSelect?.(id)
      }
    },
    [id, onSelect],
  )

  return (
    <li
      className={styles.list_item}
      data-selected={selected}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <img className={styles.avatar} src={avatarSrc} alt="Avatar" />
      <div className={styles.content}>
        <span
          className={
            selected && !showSubHeading
              ? cls(styles.heading, styles.heading_selected)
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
