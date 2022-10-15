import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Heading } from './heading';

export default {
  title: 'Heading',
  component: Heading,
} as ComponentMeta<typeof Heading>;

const Template: ComponentStory<typeof Heading> = (args) => (
  <Heading {...args} />
);

export const DefaultHeading = Template.bind({});
DefaultHeading.args = {
  children: 'Default heading',
};
