import type { Meta, StoryObj } from '@storybook/react'
import { SearchableContactList } from '@/demo/searchable-contact-list.tsx'
import demoContactList from '@/demo/mock-contact-list.json'

const meta = {
  title: 'Demo/Searchable Contact List',
  component: SearchableContactList,
} satisfies Meta<typeof SearchableContactList>

export default meta
type Story = StoryObj<typeof meta>

export const StandardFullList: Story = {
  args: {
    contactList: demoContactList,
    showAllEmails: false,
  },
}

export const EmailVariant: Story = {
  args: {
    contactList: demoContactList,
    showAllEmails: true,
  },
}
