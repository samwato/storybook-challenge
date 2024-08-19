import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { SearchableContactList } from './searchable-contact-list.tsx'

describe('SearchableContactList', () => {
  const mockOnSelectionChange = jest.fn()
  const mockContactList = [
    {
      id: '1',
      name: 'Dianne Russell',
      email: 'jane@hotmail.com',
      had_attended: true,
      thumbnail_src: '/dianne-russell.png',
    },
    {
      id: '7',
      name: 'Jenny Wilson',
      email: 'jane@hotmail.com',
      had_attended: false,
      thumbnail_src: '/jenny-wilson.png',
    },
  ]

  beforeEach(() => {
    mockOnSelectionChange.mockClear()
  })

  test('Contact list can be filtered via the search field', async () => {
    const user = userEvent.setup()
    render(
      <SearchableContactList
        contactList={mockContactList}
        showAllEmails={false}
      />,
    )

    expect(screen.getByText(mockContactList[0].name)).toBeInTheDocument()
    expect(screen.getByText(mockContactList[1].name)).toBeInTheDocument()

    const searchInput = screen.getByRole('searchbox', {
      name: 'Search Contacts',
    })
    await user.type(searchInput, 'Dian')

    expect(screen.getByText(mockContactList[0].name)).toBeInTheDocument()
    expect(screen.queryByText(mockContactList[1].name)).not.toBeInTheDocument()

    await user.clear(searchInput)
    await user.type(searchInput, 'Jen')

    expect(screen.queryByText(mockContactList[0].name)).not.toBeInTheDocument()
    expect(screen.getByText(mockContactList[1].name)).toBeInTheDocument()

    await user.clear(searchInput)
    await user.type(searchInput, 'asdf')

    expect(screen.queryByText(mockContactList[0].name)).not.toBeInTheDocument()
    expect(screen.queryByText(mockContactList[1].name)).not.toBeInTheDocument()

    await user.clear(searchInput)

    expect(screen.getByText(mockContactList[0].name)).toBeInTheDocument()
    expect(screen.getByText(mockContactList[1].name)).toBeInTheDocument()
  })

  test('Selecting contacts returns correct value to callback', async () => {
    const user = userEvent.setup()
    render(
      <SearchableContactList
        contactList={mockContactList}
        onSelectionChange={mockOnSelectionChange}
        showAllEmails
      />,
    )

    const [firstContactItem] = screen.getAllByRole('listitem')
    await user.click(firstContactItem)

    expect(mockOnSelectionChange).toHaveBeenCalledWith(
      new Set([mockContactList[0].id]),
    )
  })

  test('Keyboard navigation', async () => {
    const user = userEvent.setup()
    render(
      <SearchableContactList
        contactList={mockContactList}
        showAllEmails={false}
      />,
    )

    const searchInput = screen.getByRole('searchbox', {
      name: 'Search Contacts',
    })
    const attendedButton = screen.getByRole('button', { name: 'Attended' })
    const absentButton = screen.getByRole('button', { name: 'Absent' })
    const [attendedContactItem, absentContactItem] =
      screen.getAllByRole('listitem')

    await user.tab()
    expect(searchInput).toHaveFocus()

    await user.tab()
    expect(attendedButton).toHaveFocus()

    await user.tab()
    expect(attendedContactItem).toHaveFocus()

    await user.tab()
    expect(absentButton).toHaveFocus()

    await user.tab()
    expect(absentContactItem).toHaveFocus()
  })

  test('Accessibility', async () => {
    const { container } = render(
      <SearchableContactList
        contactList={mockContactList}
        showAllEmails={false}
      />,
    )
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
