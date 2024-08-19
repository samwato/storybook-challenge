import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { Section } from './section'
import { SectionHeader } from './section-header'
import { SectionContent } from './section-content'

describe('Section', () => {
  const TestComponent = () => (
    <Section initExpanded>
      <SectionHeader>Header</SectionHeader>
      <SectionContent>Content</SectionContent>
    </Section>
  )

  test('Works as expected', async () => {
    const user = userEvent.setup()
    render(<TestComponent />)

    const content = screen.getByText('Content')
    expect(content).toBeInTheDocument()

    const header = screen.getByRole('button', { name: 'Header' })
    await user.click(header)

    expect(content).not.toBeInTheDocument()
  })

  test('Accessibility', async () => {
    const { container } = render(<TestComponent />)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
