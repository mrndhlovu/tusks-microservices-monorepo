import { ComponentStory, ComponentMeta } from '@storybook/react'
import { AuthFormWrapper } from './auth-form-wrapper'

export default {
  component: AuthFormWrapper,
  title: 'AuthFormWrapper',
} as ComponentMeta<typeof AuthFormWrapper>

const Template: ComponentStory<typeof AuthFormWrapper> = args => (
  <AuthFormWrapper {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
