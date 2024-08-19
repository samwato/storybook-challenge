import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { SearchField } from '@/components/search-field'

describe('SearchField', () => {
  const mockLabel = 'Search'

  test('Works as expected', async () => {
    const user = userEvent.setup()
    render(<SearchField aria-label={mockLabel} placeholder={mockLabel} />)

    const input = screen.getByLabelText(mockLabel)
    expect(input).toHaveValue('')

    await user.type(input, 'test')
    expect(input).toHaveValue('test')
  })

  test('Accessibility', async () => {
    const { container } = render(
      <SearchField aria-label={mockLabel} placeholder={mockLabel} />,
    )
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
