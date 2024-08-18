import styles from './contact-list-item.module.css'
import { cls } from '../../utils/styles.ts'

interface IContactListItemProps {
  email: string
  enabled?: boolean
  name: string
  showEmail?: boolean
  thumbnail: string
}

export function ContactListItem({
  email,
  enabled = false,
  name,
  showEmail = false,
  thumbnail,
}: IContactListItemProps) {
  return (
    <li className={styles.list_item} data-enabled={enabled}>
      <img
        className={styles.thumbnail}
        src={thumbnail}
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
