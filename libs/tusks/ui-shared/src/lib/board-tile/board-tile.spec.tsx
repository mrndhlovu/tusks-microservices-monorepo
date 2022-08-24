import { render } from '@testing-library/react'

import BoardTile from './board-tile'

describe('BoardTile', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BoardTile />)
    expect(baseElement).toBeTruthy()
  })
})
