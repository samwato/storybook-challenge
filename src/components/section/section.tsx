import { type ReactNode } from 'react'
import { SectionProvider } from './section-context.tsx'

interface ISectionProps {
  children: ReactNode
  initExpanded?: boolean
}

/**
 * Behaves like an accordion.
 * Inspired by the W3 example: https://www.w3.org/WAI/ARIA/apg/patterns/accordion/examples/accordion/
 * Used in junction with the `SectionHeader` and `SectionContent` components.
 */
export function Section({ children, initExpanded = false }: ISectionProps) {
  return (
    <SectionProvider initExpanded={initExpanded}>
      <div>{children}</div>
    </SectionProvider>
  )
}
