import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Input } from './input';

export default {
  title: 'Input',
  component: Input,
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const OutlineInput = Template.bind({});
OutlineInput.args = {
  variant: 'outline',
  label: 'Outline input',
  placeholder: 'Enter your name',
};

export const FilledInput = Template.bind({});
FilledInput.args = {
  variant: 'filled',
  label: 'Filled input',
  placeholder: 'Enter your last name',
};

export const FlushedInput = Template.bind({});
FlushedInput.args = {
  variant: 'flushed',
  label: 'Flushed input',
  placeholder: 'Enter your email',
};

export const OutlineInputWithIcon = Template.bind({});
OutlineInputWithIcon.args = {
  variant: 'outline',
  label: 'Outline input with icon',
  placeholder: 'Enter your dream',
  rightAdornment: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="h-16 w-16"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
      />
    </svg>
  ),
};
