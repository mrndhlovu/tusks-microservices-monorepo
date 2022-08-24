import { render } from '@testing-library/react'

import UIDropdown from './uidropdown'

describe('UIDropdown', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UIDropdown />)
    expect(baseElement).toBeTruthy()
  })
})
