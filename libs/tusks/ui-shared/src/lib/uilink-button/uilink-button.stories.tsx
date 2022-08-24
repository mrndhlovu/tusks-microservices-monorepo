import { ComponentStory, ComponentMeta } from '@storybook/react'
import { UILinkButton } from './uilink-button'

export default {
  component: UILinkButton,
  title: 'UILinkButton',
} as ComponentMeta<typeof UILinkButton>

const Template: ComponentStory<typeof UILinkButton> = args => (
  <UILinkButton {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
