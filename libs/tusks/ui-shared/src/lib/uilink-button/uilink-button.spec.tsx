import { render } from '@testing-library/react'

import UILinkButton from './uilink-button'

describe('UILinkButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UILinkButton />)
    expect(baseElement).toBeTruthy()
  })
})
