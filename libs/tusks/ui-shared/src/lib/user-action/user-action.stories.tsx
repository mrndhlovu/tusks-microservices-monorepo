import { ComponentStory, ComponentMeta } from '@storybook/react'
import { UserAction } from './user-action'

export default {
  component: UserAction,
  title: 'UserAction',
} as ComponentMeta<typeof UserAction>

const Template: ComponentStory<typeof UserAction> = args => (
  <UserAction {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
