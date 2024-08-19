import type { Meta, StoryObj } from '@storybook/react'
import { ListItem } from '../../components/list-item'
import avatarSrc from '@/components/assets/list-item-avatar.jpg'

const meta = {
  title: 'Components/List Item',
  component: ListItem,
  tags: ['autodocs'],
} satisfies Meta<typeof ListItem>

export default meta
type Story = StoryObj<typeof meta>

export const Base: Story = {
  args: {
    avatarSrc,
    heading: 'Jane Doe',
    id: '1',
    subHeading: 'jane@hotmail.com',
  },
}

export const WithSubHeading: Story = {
  args: {
    ...Base.args,
    showSubHeading: true,
  },
}

export const Selected: Story = {
  args: {
    ...Base.args,
    selected: true,
  },
}
