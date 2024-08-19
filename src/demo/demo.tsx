import { useState } from 'react'
import { SearchField, useSearch } from '@/components/search-field'
import { Section, SectionHeader, SectionContent } from '@/components/section'
import { ContactListItem } from '@/components/contact-list-item'

/** --- IMPLEMENTATION DETAIL --- */
import contactList from './demo-contact-list.json'
/** ---------------------------- */

/**
 * This component is only for demo purposes.
 * props are used to help visualize in storybook and may not be need in real world feature.
 */
export function Demo({ showAllEmails }: { showAllEmails: boolean }) {
  const [selectionIds, setSelectionIds] = useState<Set<string>>(new Set())

  const { search, handleSearchChange, filteredList } = useSearch(contactList, {
    valueGetter: (contact) => contact.name,
  })

  const attendedContactList = filteredList.filter(
    (contact) => contact.had_attended,
  )
  const absentContactList = filteredList.filter(
    (contact) => !contact.had_attended,
  )

  function handleSelection(contactId: string) {
    setSelectionIds((prevSelectionIds) => {
      if (prevSelectionIds.has(contactId)) {
        prevSelectionIds.delete(contactId)
      } else {
        prevSelectionIds.add(contactId)
      }
      return new Set(prevSelectionIds)
    })
  }

  return (
    <div style={{ maxWidth: '400px' }}>
      <SearchField value={search} onChange={handleSearchChange} />
      <Section initExpanded>
        <SectionHeader>Attended</SectionHeader>
        <SectionContent>
          {attendedContactList.map((contact) => (
            <ContactListItem
              key={contact.id}
              enabled={selectionIds.has(contact.id)}
              email={contact.email}
              name={contact.name}
              id={contact.id}
              showEmail={showAllEmails}
              thumbnailSrc={contact.thumbnail_src}
              onClick={handleSelection}
            />
          ))}
        </SectionContent>
      </Section>
      <Section initExpanded>
        <SectionHeader>Absent</SectionHeader>
        <SectionContent>
          {absentContactList.map((contact) => (
            <ContactListItem
              key={contact.id}
              enabled={selectionIds.has(contact.id)}
              email={contact.email}
              id={contact.id}
              name={contact.name}
              showEmail={showAllEmails}
              thumbnailSrc={contact.thumbnail_src}
              onClick={handleSelection}
            />
          ))}
        </SectionContent>
      </Section>
    </div>
  )
}
