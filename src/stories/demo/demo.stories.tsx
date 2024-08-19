import type { Meta, StoryObj } from '@storybook/react'
import { Demo } from '@/demo/demo.tsx'

const meta = {
  title: 'Demo/Searchable List',
  component: Demo,
} satisfies Meta<typeof Demo>

export default meta
type Story = StoryObj<typeof meta>

export const StandardFullList: Story = {
  args: {
    showAllEmails: false,
  },
}

export const EmailVariant: Story = {
  args: {
    showAllEmails: true,
  },
}
