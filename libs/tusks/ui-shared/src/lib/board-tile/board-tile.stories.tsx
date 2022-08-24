import { ComponentStory, ComponentMeta } from '@storybook/react'
import { BoardTile } from './board-tile'

export default {
  component: BoardTile,
  title: 'BoardTile',
} as ComponentMeta<typeof BoardTile>

const Template: ComponentStory<typeof BoardTile> = args => (
  <BoardTile {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
