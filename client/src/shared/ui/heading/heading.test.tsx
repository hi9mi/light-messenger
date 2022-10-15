import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';

import * as stories from './heading.stories';

const { DefaultHeading } = composeStories(stories);

it('render default heading', () => {
  render(<DefaultHeading />);

  expect(screen.getByText(/Default heading/i)).toBeInTheDocument();
});
