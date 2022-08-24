import { ComponentStory, ComponentMeta } from '@storybook/react'
import { BoardMemberCard } from './board-member-card'

export default {
  component: BoardMemberCard,
  title: 'BoardMemberCard',
} as ComponentMeta<typeof BoardMemberCard>

const Template: ComponentStory<typeof BoardMemberCard> = args => (
  <BoardMemberCard {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
