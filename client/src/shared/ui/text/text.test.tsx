import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';

import * as stories from './text.stories';

const { DefaultText } = composeStories(stories);

it('render default text', () => {
  render(<DefaultText />);

  expect(screen.getByText(/Default text/i)).toBeInTheDocument();
});
