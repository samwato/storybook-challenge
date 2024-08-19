import { render, type RenderOptions, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { ListItem, type IListItemProps } from './list-item'
import { List } from './list'
import avatarSrc from '@/components/assets/list-item-avatar.jpg'

describe('ListItem', () => {
  const mockOnSelect = jest.fn()
  const mockProps: IListItemProps = {
    id: '1',
    avatarSrc,
    heading: 'Jane Doe',
    subHeading: 'jane@hotmail.com',
    onSelect: mockOnSelect,
  }
  const wrapper: RenderOptions['wrapper'] = ({ children }) => (
    <List>{children}</List>
  )

  beforeEach(() => {
    mockOnSelect.mockClear()
  })

  test('Works as expected', async () => {
    const user = userEvent.setup()
    render(<ListItem {...mockProps} />, { wrapper })

    const listItem = screen.getByRole('listitem')
    expect(listItem).toHaveTextContent(mockProps.heading)
    expect(screen.queryByText(mockProps.subHeading)).not.toBeInTheDocument()

    await user.click(listItem)
    expect(mockOnSelect).toHaveBeenCalledTimes(1)
  })

  test('Sub heading shows when enabled', () => {
    render(<ListItem {...mockProps} showSubHeading />, { wrapper })

    expect(screen.getByText(mockProps.subHeading)).toBeInTheDocument()
  })

  /**
   * I don't like testing for classes, but I'm guessing that these contact items
   * are meant to be "selectable". I will keep them as just list item for now.
   * But another options could have been to make them have a role of `option` for a `listbox` component,
   * then testing for `aria-selected` attribute might have been better suited.
   */
  test.each<[Partial<IListItemProps>, string]>([
    [{ selected: true }, 'heading heading_selected'],
    [{ selected: true, showSubHeading: true }, 'heading'],
  ])('Correct classes are applied', async (props, classes) => {
    render(<ListItem {...mockProps} {...props} />, { wrapper })

    const heading = screen.getByText(mockProps.heading)
    expect(heading).toHaveClass(classes)
  })

  test('Keyboard navigation', async () => {
    const user = userEvent.setup()
    render(<ListItem {...mockProps} />, { wrapper })

    await user.tab()
    const listItem = screen.getByRole('listitem')
    expect(listItem).toHaveFocus()

    await user.keyboard('[Enter]')
    expect(mockOnSelect).toHaveBeenCalledTimes(1)
    expect(mockOnSelect).toHaveBeenLastCalledWith(mockProps.id)

    await user.keyboard('[Space]')
    expect(mockOnSelect).toHaveBeenCalledTimes(2)
    expect(mockOnSelect).toHaveBeenLastCalledWith(mockProps.id)
  })

  test('Accessibility', async () => {
    const { container } = render(<ListItem {...mockProps} showSubHeading />, {
      wrapper,
    })
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
