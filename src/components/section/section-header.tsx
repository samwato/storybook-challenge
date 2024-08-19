import { type KeyboardEventHandler, type ReactNode, useCallback } from 'react'
import styles from './section.module.css'
import chevronRight from '../assets/chevron-right.svg'
import chevronDown from '../assets/chevron-down.svg'
import { useSection } from './section-context.tsx'

interface ISectionHeaderProps {
  children: ReactNode
}

export function SectionHeader({ children }: ISectionHeaderProps) {
  const { expanded, toggleExpanded, ids } = useSection()

  const handleKeyDown = useCallback<KeyboardEventHandler<HTMLElement>>(
    (event) => {
      if (event.key === ' ' || event.key === 'Enter') {
        toggleExpanded()
      }
    },
    [toggleExpanded],
  )

  return (
    <div
      id={ids.header}
      aria-controls={ids.content}
      aria-expanded={expanded}
      role="button"
      className={styles.header}
      onClick={toggleExpanded}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {children}
      <img
        alt=""
        src={expanded ? chevronDown : chevronRight}
        width="20"
        height="20"
      />
    </div>
  )
}
