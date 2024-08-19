import { render, type RenderOptions, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { SearchField } from '@/components/search-field'

describe('SearchField', () => {
  const mockLabel = 'Search Contacts'
  const wrapper: RenderOptions['wrapper'] = ({ children }) => (
    <form>
      <label>
        {mockLabel}
        {children}
      </label>
    </form>
  )

  test('Works as expected', async () => {
    const user = userEvent.setup()
    render(<SearchField />, { wrapper })

    const input = screen.getByLabelText(mockLabel)
    expect(input).toHaveValue('')

    await user.type(input, 'test')
    expect(input).toHaveValue('test')
  })

  test('Accessibility', async () => {
    const { container } = render(<SearchField />, {
      wrapper,
    })
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
