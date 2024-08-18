import {
  createContext,
  type ReactNode,
  useContext,
  useId,
  useMemo,
  useState,
} from 'react'

interface ISectionContext {
  ids: {
    header: string
    content: string
  }
  expanded: boolean
  toggleExpanded: () => void
}

const SectionContext = createContext<ISectionContext | undefined>(undefined)

export function useSection() {
  const context = useContext(SectionContext)
  if (!context) {
    throw new Error('useSection must be used within a SectionProvider')
  }
  return context
}

interface ISectionProviderProps {
  initExpanded?: boolean
  children: ReactNode
}

export function SectionProvider({
  initExpanded = false,
  children,
}: ISectionProviderProps) {
  const uuid = useId()
  const [expanded, setExpanded] = useState(initExpanded)

  const value = useMemo(
    () => ({
      ids: {
        header: `section-header-${uuid}`,
        content: `section-header-content-${uuid}`,
      },
      expanded,
      toggleExpanded: () => setExpanded((prevState) => !prevState),
    }),
    [expanded, uuid],
  )

  return (
    <SectionContext.Provider value={value}>{children}</SectionContext.Provider>
  )
}
