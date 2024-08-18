import type { Meta, StoryObj } from '@storybook/react'
import { SearchField } from './search-field.tsx'

const meta = {
  title: 'Search Field',
  component: SearchField,
  tags: ['autodocs'],
} satisfies Meta<typeof SearchField>

export default meta
type Story = StoryObj<typeof meta>

export const Base: Story = {}
