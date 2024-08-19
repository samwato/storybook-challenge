import { render, type RenderOptions, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { ListItem, type IListItemProps } from '@/components/list-item'
import avatarSrc from '@/components/assets/list-item-avatar.jpg'

describe('ListItem', () => {
  const mockOnClick = jest.fn()
  const mockProps: IListItemProps = {
    id: '1',
    avatarSrc,
    heading: 'Jane Doe',
    subHeading: 'jane@hotmail.com',
    onClick: mockOnClick,
  }
  const wrapper: RenderOptions['wrapper'] = ({ children }) => (
    <ul>{children}</ul>
  )

  beforeEach(() => {
    mockOnClick.mockClear()
  })

  test('Works as expected', async () => {
    const user = userEvent.setup()
    render(<ListItem {...mockProps} />, { wrapper })

    const listItem = screen.getByRole('listitem')
    expect(listItem).toHaveTextContent(mockProps.heading)
    expect(screen.queryByText(mockProps.subHeading)).not.toBeInTheDocument()

    await user.click(listItem)
    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })

  test('Sub heading shows when enabled', () => {
    render(<ListItem {...mockProps} showSubHeading />, { wrapper })

    expect(screen.getByText(mockProps.subHeading)).toBeInTheDocument()
  })

  test('Accessibility', async () => {
    const { container } = render(<ListItem {...mockProps} showSubHeading />, {
      wrapper,
    })
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
