import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';

import * as stories from './button.stories';

const { SolidButton, OutlineButton, GhostButton, LinkButton } =
  composeStories(stories);

it('render solid button', () => {
  render(<SolidButton />);

  expect(screen.getByText(/Solid Button/i)).toBeInTheDocument();
});

it('render outline button', () => {
  render(<OutlineButton />);

  expect(screen.getByText(/Outline Button/i)).toBeInTheDocument();
});

it('render ghost button', () => {
  render(<GhostButton />);

  expect(screen.getByText(/Ghost Button/i)).toBeInTheDocument();
});

it('render link button', () => {
  render(<LinkButton />);

  expect(screen.getByText(/Link Button/i)).toBeInTheDocument();
});
