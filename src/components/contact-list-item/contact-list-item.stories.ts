import type { Meta, StoryObj } from '@storybook/react'
import { ContactListItem } from './contact-list-item'
import thumbnail from '../assets/contact-list-item-thumbnail.jpg'

const meta = {
  title: 'Contact List Item',
  component: ContactListItem,
  tags: ['autodocs'],
} satisfies Meta<typeof ContactListItem>

export default meta
type Story = StoryObj<typeof meta>

export const Base: Story = {
  args: {
    name: 'Jane Doe',
    thumbnail: thumbnail,
    email: 'jane@hotmail.com',
  },
}

export const WithEmail: Story = {
  args: {
    ...Base.args,
    showEmail: true,
  },
}

export const WithEnabled: Story = {
  args: {
    ...Base.args,
    enabled: true,
  },
}
