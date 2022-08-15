import { render } from '@testing-library/react';

import TusksUiShared from './tusks-ui-shared';

describe('TusksUiShared', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TusksUiShared />);
    expect(baseElement).toBeTruthy();
  });
});
