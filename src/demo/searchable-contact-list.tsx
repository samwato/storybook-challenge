import { useState } from 'react'
import { SearchField, useSearch } from '@/components/search-field'
import { Section, SectionHeader, SectionContent } from '@/components/section'
import { List, ListItem } from '@/components/list-item'

interface ISearchableContactListProps {
  contactList: {
    id: string
    email: string
    name: string
    had_attended: boolean
    thumbnail_src: string
  }[]
  onSelectionChange?: (selectionContactIds: Set<string>) => void
  showAllEmails: boolean
}

/**
 * This component is only for demo purposes.
 * props are only used to help visualize in storybook and test.
 */
export function SearchableContactList({
  contactList,
  onSelectionChange,
  showAllEmails,
}: ISearchableContactListProps) {
  const [selectionContactIds, setSelectionContactIds] = useState<Set<string>>(
    new Set(),
  )

  const {
    search,
    handleSearchChange,
    filteredList: filteredContactList,
  } = useSearch(contactList, {
    valueGetter: (contact) => contact.name,
  })

  const attendedContactList = filteredContactList.filter(
    (contact) => contact.had_attended,
  )
  const absentContactList = filteredContactList.filter(
    (contact) => !contact.had_attended,
  )

  function handleContactSelection(contactId: string) {
    setSelectionContactIds((prevIds) => {
      if (prevIds.has(contactId)) {
        prevIds.delete(contactId)
      } else {
        prevIds.add(contactId)
      }
      const newSelectionContactids = new Set(prevIds)
      onSelectionChange?.(newSelectionContactids)
      return newSelectionContactids
    })
  }

  const renderContactListItems = (contact: (typeof contactList)[number]) => (
    <ListItem
      key={contact.id}
      id={contact.id}
      avatarSrc={contact.thumbnail_src}
      heading={contact.name}
      onSelect={handleContactSelection}
      selected={selectionContactIds.has(contact.id)}
      subHeading={contact.email}
      showSubHeading={showAllEmails}
    />
  )

  return (
    <div style={{ maxWidth: '400px' }}>
      <SearchField
        aria-label="Search Contacts"
        placeholder="Search"
        value={search}
        onChange={handleSearchChange}
      />
      <Section initExpanded>
        <SectionHeader>Attended</SectionHeader>
        <SectionContent>
          <List>{attendedContactList.map(renderContactListItems)}</List>
        </SectionContent>
      </Section>
      <Section initExpanded>
        <SectionHeader>Absent</SectionHeader>
        <SectionContent>
          <List>{absentContactList.map(renderContactListItems)}</List>
        </SectionContent>
      </Section>
    </div>
  )
}
