import type { Meta, StoryObj } from '@storybook/react'
import { Section, SectionHeader, SectionContent } from '@/components/section'

const meta: Meta<typeof Section> = {
  title: 'Components/Section',
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
