import type { Meta, StoryObj } from '@storybook/react'
import { Section } from './section.tsx'
import { SectionHeader } from './section-header.tsx'
import { SectionContent } from './section-content.tsx'

const meta: Meta<typeof Section> = {
  title: 'Section',
  component: Section,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Base: Story = {
  render: (args) => (
    <Section {...args}>
      <SectionHeader>Absent</SectionHeader>
      <SectionContent>Content</SectionContent>
    </Section>
  ),
}
