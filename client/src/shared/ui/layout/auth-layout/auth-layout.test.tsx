import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';

import * as stories from './auth-layout.stories';

const { DefaultAuthLayout } = composeStories(stories);

it('render auth layout', () => {
  render(<DefaultAuthLayout />);

  expect(screen.getByText(/Auth form/i)).toBeInTheDocument();
});
