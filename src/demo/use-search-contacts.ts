import { type ChangeEvent, useCallback, useState } from 'react'
import demoContactList from './demo-contact-list.json'

type IContactItem = {
  id: string
  name: string
  email: string
  had_attended: boolean
  thumbnail_src: string
}

type IUseSearchContacts = (initSearch?: string) => {
  search: string
  handleSearchChange: (event: ChangeEvent<HTMLInputElement>) => void
  filteredContactList: IContactItem[]
}

/**
 * For this challenge, I'm abstracting the search filtering logic.
 * Reason for this, is there are too many unknown implementation variables regarding the contact list data.
 * Transforming the data may look very different in a real world scenario.
 * For this demo, I'll make it most readable and not worry about making multiple loops.
 */
export const useSearchContacts: IUseSearchContacts = (initSearch = '') => {
  const [search, setSearch] = useState(initSearch)
  const searchValue = search.trim().toLowerCase()

  const handleSearchChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value)
    },
    [],
  )

  const filteredContactList = demoContactList.filter((contact) =>
    contact.name.toLowerCase().includes(searchValue),
  )

  return {
    search,
    handleSearchChange,
    filteredContactList,
  }
}
