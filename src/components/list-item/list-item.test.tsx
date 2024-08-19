import { render, screen } from '@testing-library/react'
import { ListItem } from '@/components/list-item'
import avatarSrc from '@/components/assets/list-item-avatar.jpg'

describe('ListItem', () => {
  test('Renders correctly', () => {
    render(
      <ListItem
        id="1"
        avatarSrc={avatarSrc}
        heading="Jane Doe"
        subHeading="jane@hotmail.com"
      />,
    )

    const listItem = screen.getByRole('listitem')
    expect(listItem).toHaveTextContent('Jane Doe')
  })
})
