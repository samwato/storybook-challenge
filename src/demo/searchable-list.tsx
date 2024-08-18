import { useState } from 'react'
import { SearchField } from '@/components/search-field'
import { Section, SectionHeader, SectionContent } from '@/components/section'
import { ContactListItem } from '@/components/contact-list-item'
import { useSearchContacts } from './use-search-contacts.ts'

/**
 * This component is only for demo purposes
 */
export function SearchableList({
  showAllEmails = false,
}: {
  showAllEmails?: boolean
}) {
  const [selectionIds, setSelectionIds] = useState<Set<string>>(new Set())
  const { search, handleSearchChange, filteredContactList } =
    useSearchContacts()

  const attendedContactList = filteredContactList.filter(
    (contact) => contact.had_attended,
  )
  const absentContactList = filteredContactList.filter(
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
      <Section initExpanded={true}>
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
      <Section initExpanded={true}>
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
