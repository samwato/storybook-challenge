import type { Meta, StoryObj } from '@storybook/react'
import { SectionHeader } from './section-header.tsx'

const meta = {
  title: 'Section Header',
  component: SectionHeader,
  tags: ['autodocs'],
} satisfies Meta<typeof SectionHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Base: Story = {
  args: {
    children: <p>Content</p>,
    header: 'Absent',
  },
}
