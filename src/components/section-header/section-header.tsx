import { useId, useState } from 'react'
import styles from './section-header.module.css'
import chevronRight from '../assets/chevron-right.svg'
import chevronDown from '../assets/chevron-down.svg'

interface ISectionHeaderProps {
  children?: JSX.Element
  header: string
  initExpanded?: boolean
}

/**
 * Section Header
 * Behaves like an accordion.
 * Inspired by the W3 example: https://www.w3.org/WAI/ARIA/apg/patterns/accordion/examples/accordion/
 */
export function SectionHeader({
  children,
  header,
  initExpanded = false,
}: ISectionHeaderProps) {
  const uuid = useId()
  const headerId = `section-header-${uuid}`
  const contentId = `section-header-content-${uuid}`

  const [expanded, setExpanded] = useState(initExpanded)

  function handleClick() {
    setExpanded((prevState) => !prevState)
  }

  return (
    <>
      <div
        id={headerId}
        aria-controls={contentId}
        aria-expanded={expanded}
        role="button"
        className={styles.header}
        onClick={handleClick}
      >
        <span>{header}</span>
        <img
          alt=""
          src={expanded ? chevronDown : chevronRight}
          width="20"
          height="20"
        />
      </div>
      {expanded && (
        <div id={contentId} aria-labelledby={headerId} role="region">
          {children}
        </div>
      )}
    </>
  )
}
