import { ComponentStory, ComponentMeta } from '@storybook/react'
import { UserAvatar } from './user-avatar'

export default {
  component: UserAvatar,
  title: 'UserAvatar',
} as ComponentMeta<typeof UserAvatar>

const Template: ComponentStory<typeof UserAvatar> = args => (
  <UserAvatar {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
