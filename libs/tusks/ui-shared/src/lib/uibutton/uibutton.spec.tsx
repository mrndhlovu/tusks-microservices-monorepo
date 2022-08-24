import { render } from '@testing-library/react'

import UIButton from './uibutton'

describe('UIButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UIButton />)
    expect(baseElement).toBeTruthy()
  })
})
