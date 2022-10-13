import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';

import * as stories from './input.stories';

const { FilledInput, FlushedInput, OutlineInput, OutlineInputWithIcon } =
  composeStories(stories);

it('render filled input', () => {
  render(<FilledInput />);

  expect(screen.getByText(/Filled input/i)).toBeInTheDocument();
});

it('render flushed input', () => {
  render(<FlushedInput />);

  expect(screen.getByText(/Flushed input/i)).toBeInTheDocument();
});

it('render outline input', () => {
  render(<OutlineInput />);

  expect(screen.getByText(/Outline input/i)).toBeInTheDocument();
});

it('render outline input with icon', () => {
  render(<OutlineInputWithIcon />);

  expect(screen.getByText(/Outline input with icon/i)).toBeInTheDocument();
});
