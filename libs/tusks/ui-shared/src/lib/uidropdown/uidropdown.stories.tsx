import { ComponentStory, ComponentMeta } from '@storybook/react'
import UIDropdown from './uidropdown'

export default {
  component: UIDropdown,
  title: 'UIDropdown',
} as ComponentMeta<typeof UIDropdown>

const Template: ComponentStory<typeof UIDropdown> = args => (
  <UIDropdown {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
