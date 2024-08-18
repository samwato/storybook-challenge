import { useCallback } from 'react'
import styles from './contact-list-item.module.css'
import { cls } from '../../utils/styles.ts'

interface IContactListItemProps {
  email: string
  enabled?: boolean
  id: string
  name: string
  onClick?: (id: string) => void
  showEmail?: boolean
  thumbnailSrc: string
}

export function ContactListItem({
  email,
  enabled = false,
  id,
  name,
  onClick,
  showEmail = false,
  thumbnailSrc,
}: IContactListItemProps) {
  const handleClick = useCallback(() => {
    onClick?.(id)
  }, [id, onClick])

  return (
    <li
      className={styles.list_item}
      data-enabled={enabled}
      onClick={handleClick}
    >
      <img
        className={styles.thumbnail}
        src={thumbnailSrc}
        alt="Contact Thumbnail"
      />
      <div className={styles.content}>
        <span
          className={
            enabled && !showEmail
              ? cls(styles.name, styles.name_enabled)
              : styles.name
          }
        >
          {name}
        </span>
        {showEmail && <span className={styles.email}>{email}</span>}
      </div>
    </li>
  )
}
