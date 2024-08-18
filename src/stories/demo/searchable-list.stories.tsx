import type { Meta, StoryObj } from '@storybook/react'
import { SearchableList } from '@/demo/searchable-list'

const meta: Meta<typeof SearchableList> = {
  title: 'Demo/SearchableList',
  component: SearchableList,
}

export default meta
type Story = StoryObj<typeof meta>

export const StandardFullList: Story = {}

export const EmailVariant: Story = {
  args: {
    showAllEmails: true,
  },
}
