import { type ReactNode } from 'react'
import styles from './section.module.css'
import { useSection } from './section-context.tsx'

interface ISectionHeaderProps {
  children: ReactNode
}

export function SectionContent({ children }: ISectionHeaderProps) {
  const { expanded, ids } = useSection()

  return expanded ? (
    <div
      id={ids.content}
      aria-labelledby={ids.header}
      className={styles.content}
      role="region"
    >
      {children}
    </div>
  ) : null
}
