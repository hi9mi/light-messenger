import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Button } from './button';

export default {
  title: 'Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const SolidButton = Template.bind({});
SolidButton.args = {
  variant: 'solid',
  children: 'Solid Button',
};

export const OutlineButton = Template.bind({});
OutlineButton.args = {
  variant: 'outline',
  children: 'Outline Button',
};

export const GhostButton = Template.bind({});
GhostButton.args = {
  variant: 'ghost',
  children: 'Ghost Button',
};

export const LinkButton = Template.bind({});
LinkButton.args = {
  variant: 'link',
  children: 'Link Button',
};
