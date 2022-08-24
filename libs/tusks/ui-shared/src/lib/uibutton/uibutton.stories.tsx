import { ComponentStory, ComponentMeta } from '@storybook/react'
import { UIButton } from './uibutton'

export default {
  component: UIButton,
  title: 'UIButton',
} as ComponentMeta<typeof UIButton>

const Template: ComponentStory<typeof UIButton> = args => <UIButton {...args} />

export const Primary = Template.bind({})
Primary.args = {}
