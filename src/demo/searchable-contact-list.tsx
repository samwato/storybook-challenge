import { useState } from 'react'
import { SearchField, useSearch } from '@/components/search-field'
import { Section, SectionHeader, SectionContent } from '@/components/section'
import { ListItem } from '../components/list-item'

/** --- IMPLEMENTATION DETAIL --- */
import contactList from './contact-list.json'
/** ---------------------------- */

/**
 * This component is only for demo purposes.
 * props are used to help visualize in storybook and may not be need in real world feature.
 */
export function SearchableContactList({
  showAllEmails,
}: {
  showAllEmails: boolean
}) {
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
      return new Set(prevIds)
    })
  }

  const renderContactListItems = (contact: (typeof contactList)[number]) => (
    <ListItem
      key={contact.id}
      id={contact.id}
      avatarSrc={contact.thumbnail_src}
      heading={contact.name}
      onClick={handleContactSelection}
      selected={selectionContactIds.has(contact.id)}
      subHeading={contact.email}
      showSubHeading={showAllEmails}
    />
  )

  return (
    <div style={{ maxWidth: '400px' }}>
      <SearchField value={search} onChange={handleSearchChange} />
      <Section initExpanded>
        <SectionHeader>Attended</SectionHeader>
        <SectionContent>
          {attendedContactList.map(renderContactListItems)}
        </SectionContent>
      </Section>
      <Section initExpanded>
        <SectionHeader>Absent</SectionHeader>
        <SectionContent>
          {absentContactList.map(renderContactListItems)}
        </SectionContent>
      </Section>
    </div>
  )
}
