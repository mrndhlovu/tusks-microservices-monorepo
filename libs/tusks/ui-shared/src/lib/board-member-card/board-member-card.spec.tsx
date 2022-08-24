import { render } from '@testing-library/react'

import BoardMemberCard from './board-member-card'

describe('BoardMemberCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BoardMemberCard />)
    expect(baseElement).toBeTruthy()
  })
})
