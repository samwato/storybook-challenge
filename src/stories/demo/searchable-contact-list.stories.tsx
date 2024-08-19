import type { Meta, StoryObj } from '@storybook/react'
import { SearchableContactList } from '@/demo/searchable-contact-list.tsx'

const meta = {
  title: 'Demo/Searchable Contact List',
  component: SearchableContactList,
} satisfies Meta<typeof SearchableContactList>

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
